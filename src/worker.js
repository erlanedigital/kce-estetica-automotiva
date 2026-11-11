/**
 * Cloudflare Worker — KCE Estética Automotiva
 * Subdomínio Oficial: kce.emia.workers.dev
 * Lava-jato Premium em Montes Claros - MG
 * SPA, Assets, Segurança Bancária HSTS e API REST de Agendamentos
 */

const SECURITY_HEADERS = {
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "X-XSS-Protection": "1; mode=block",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; img-src 'self' https: data: blob:; media-src 'self' https: data: blob:; font-src 'self' https: data:; connect-src 'self' https:;"
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Api-Key",
  "Access-Control-Max-Age": "86400"
};

let inMemoryBookings = [];

function addSecurityHeaders(response) {
  const newHeaders = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    newHeaders.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Preflight CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: { ...CORS_HEADERS, ...SECURITY_HEADERS }
      });
    }

    // 1. Health check
    if (url.pathname === "/api/health") {
      return new Response(JSON.stringify({
        status: "online",
        project: "kce-estetica-automotiva",
        domain: "kce.emia.workers.dev",
        establishment: "KCE Estética Automotiva",
        location: "Próximo à Praça de Esportes • Montes Claros - MG",
        security: "bank-grade",
        timestamp: new Date().toISOString()
      }, null, 2), {
        headers: { "Content-Type": "application/json", ...CORS_HEADERS, ...SECURITY_HEADERS }
      });
    }

    // 2. API /api/bookings (Listar e Ingerir Agendamentos)
    if (url.pathname === "/api/bookings") {
      if (request.method === "GET") {
        return new Response(JSON.stringify({
          success: true,
          total: inMemoryBookings.length,
          bookings: inMemoryBookings,
          timestamp: new Date().toISOString()
        }), {
          headers: { "Content-Type": "application/json", ...CORS_HEADERS, ...SECURITY_HEADERS }
        });
      }

      if (request.method === "POST") {
        try {
          const body = await request.json();
          const newBooking = {
            id: "KCE-" + Date.now().toString().slice(-4),
            name: body.name || "Cliente KCE",
            phone: body.phone || "",
            service: body.service || "Higienização Completa",
            carType: body.carType || "SUV",
            vehicle: body.vehicle || "Veículo não especificado",
            plate: body.plate || "A confirmar",
            date: body.date || new Date().toISOString().split("T")[0],
            time: body.time || "13:30",
            price: body.price || 129,
            status: "Pendente Aprovação",
            coupon: body.coupon || "",
            createdAt: new Date().toISOString()
          };

          inMemoryBookings.unshift(newBooking);
          if (inMemoryBookings.length > 500) inMemoryBookings.pop();

          return new Response(JSON.stringify({
            success: true,
            message: "Autoagendamento recebido com sucesso no Worker KCE!",
            booking: newBooking
          }), {
            status: 201,
            headers: { "Content-Type": "application/json", ...CORS_HEADERS, ...SECURITY_HEADERS }
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: "JSON inválido", details: e.message }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...CORS_HEADERS, ...SECURITY_HEADERS }
          });
        }
      }
    }

    // Servir assets estáticos compilados em dist/ (SPA)
    if (env.ASSETS) {
      try {
        const assetResponse = await env.ASSETS.fetch(request);
        return addSecurityHeaders(assetResponse);
      } catch (e) {
        return new Response("Asset not found", { status: 404, headers: SECURITY_HEADERS });
      }
    }

    return new Response("KCE Estética Automotiva — Worker Ativo", {
      headers: { "Content-Type": "text/plain; charset=utf-8", ...SECURITY_HEADERS }
    });
  }
};
