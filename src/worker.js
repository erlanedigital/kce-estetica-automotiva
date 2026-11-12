/**
 * Cloudflare Worker — KCL Estética Automotiva
 * Subdomínio Oficial: kcl.emia.workers.dev
 * Lava-jato Premium em Montes Claros - MG
 * Servindo Aplicação Original Completa com Ações e Roteamento SPA
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

// In-memory collections store fallback
const collections = {
  kce_bookings: [],
  kce_services: [],
  kce_clients: [],
  kce_stock: [],
  kce_finance: [],
  kce_gp_scores: [],
  kce_partners: [],
  kce_settings: []
};

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

    // 1. Backend Actions API Handler
    if (url.pathname === "/actions" || url.pathname === "actions") {
      try {
        const body = await request.json();
        const action = body.action;
        const args = body.args || {};
        const col = args.collection || "default";

        if (!collections[col]) {
          collections[col] = [];
        }

        let result = {};

        if (action === "records.list") {
          result = { records: collections[col] };
        } else if (action === "records.create") {
          const id = args.idempotency_key || ("rec_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6));
          const newRec = { id, value: args.value };
          collections[col].push(newRec);
          result = { record: newRec };
        } else if (action === "records.replace") {
          const idx = collections[col].findIndex(r => r.id === args.id);
          const updated = { id: args.id, value: args.value };
          if (idx !== -1) {
            collections[col][idx] = updated;
          } else {
            collections[col].push(updated);
          }
          result = { record: updated };
        } else if (action === "records.delete") {
          collections[col] = collections[col].filter(r => r.id !== args.id);
          result = { success: true };
        } else if (action === "records.get") {
          const found = collections[col].find(r => r.id === args.id);
          result = { record: found || null };
        }

        return new Response(JSON.stringify({ data: result }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...CORS_HEADERS, ...SECURITY_HEADERS }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...CORS_HEADERS, ...SECURITY_HEADERS }
        });
      }
    }

    // 2. Health check
    if (url.pathname === "/api/health") {
      return new Response(JSON.stringify({
        status: "online",
        project: "kcl-estetica-automotiva",
        domain: "kcl.emia.workers.dev",
        establishment: "KCL Estética Automotiva",
        location: "Montes Claros - MG",
        original: true,
        timestamp: new Date().toISOString()
      }, null, 2), {
        headers: { "Content-Type": "application/json", ...CORS_HEADERS, ...SECURITY_HEADERS }
      });
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

    return new Response("KCL Estética Automotiva — Worker Ativo", {
      headers: { "Content-Type": "text/plain; charset=utf-8", ...SECURITY_HEADERS }
    });
  }
};
