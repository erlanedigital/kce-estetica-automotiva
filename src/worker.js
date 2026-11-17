/**
 * Cloudflare Worker — KCL Estética Automotiva
 * Subdomínio Oficial: kcl.emia.workers.dev
 * Lava-jato Premium em Montes Claros - MG
 * Servindo Aplicação Original Completa, PWA, Ações, Backup e Roteamento SPA
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

// In-memory collections store fallback com suporte a backups
const collections = {
  kce_bookings: [],
  kce_services: [],
  kce_clients: [],
  kce_stock: [],
  kce_finance: [],
  kce_gp_scores: [],
  kce_partners: [],
  kce_settings: [],
  kce_backups: []
};

function addSecurityHeaders(response, customHeaders = {}) {
  const newHeaders = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    newHeaders.set(key, value);
  }
  for (const [key, value] of Object.entries(customHeaders)) {
    newHeaders.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

// Consolidador de Backup do Sistema
function generateSystemBackupSnapshot(triggerType = "auto_midnight") {
  const now = new Date();
  return {
    meta: {
      app: "KCL Estética Automotiva",
      domain: "kcl.emia.workers.dev",
      trigger: triggerType,
      timestamp: now.toISOString(),
      date: now.toISOString().split("T")[0],
      serverTimeBRT: now.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
    },
    collections: { ...collections }
  };
}

export default {
  // Rotina Cron Agendada: Dispara todo dia à meia-noite (00:00 BRT / 03:00 UTC)
  async scheduled(event, env, ctx) {
    console.log("⏰ [CRON WORKER] Executando rotina diária de backup da meia-noite...");
    const snapshot = generateSystemBackupSnapshot("cron_worker_midnight");
    const id = "backup-cron-midnight-" + snapshot.meta.date;

    // Salva no banco de dados interno
    collections.kce_backups.push({
      id: id,
      value: snapshot
    });

    // Se houver Webhook do Google Drive configurado na Cloudflare
    if (env && env.GDRIVE_WEBHOOK_URL) {
      try {
        await fetch(env.GDRIVE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: `kcl_backup_auto_${snapshot.meta.date}.json`,
            content: JSON.stringify(snapshot, null, 2),
            timestamp: snapshot.meta.timestamp,
            source: "Cloudflare Worker Cron"
          })
        });
        console.log("✅ [CRON WORKER] Backup enviado com sucesso para o Google Drive!");
      } catch (e) {
        console.error("⚠️ [CRON WORKER] Erro ao enviar webhook do Google Drive:", e);
      }
    }
  },

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

    // 2. Endpoint de Backup Dedicado
    if (url.pathname === "/api/backup") {
      if (request.method === "GET") {
        const snapshot = generateSystemBackupSnapshot("manual_api_get");
        return new Response(JSON.stringify(snapshot, null, 2), {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Content-Disposition": `attachment; filename="kcl_backup_${new Date().toISOString().split("T")[0]}.json"`,
            ...CORS_HEADERS,
            ...SECURITY_HEADERS
          }
        });
      }

      if (request.method === "POST") {
        try {
          const payload = await request.json();
          const id = "backup-manual-" + Date.now();
          collections.kce_backups.push({ id, value: payload });

          // Se houver Google Drive Webhook
          const driveWebhook = payload.gdriveWebhook || (env && env.GDRIVE_WEBHOOK_URL);
          let gdriveStatus = "not_configured";
          if (driveWebhook) {
            try {
              await fetch(driveWebhook, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  filename: `kcl_backup_${new Date().toISOString().split("T")[0]}.json`,
                  content: JSON.stringify(payload, null, 2),
                  timestamp: new Date().toISOString()
                })
              });
              gdriveStatus = "sent";
            } catch(e) {
              gdriveStatus = "error: " + e.message;
            }
          }

          return new Response(JSON.stringify({ success: true, id, gdriveStatus }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...CORS_HEADERS, ...SECURITY_HEADERS }
          });
        } catch(err) {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...CORS_HEADERS, ...SECURITY_HEADERS }
          });
        }
      }
    }

    // 3. Health check
    if (url.pathname === "/api/health") {
      return new Response(JSON.stringify({
        status: "online",
        project: "kcl-estetica-automotiva",
        domain: "kcl.emia.workers.dev",
        establishment: "KCL Estética Automotiva",
        location: "Montes Claros - MG",
        pwa: true,
        lgpd: true,
        backupMidnightCron: "0 3 * * * (00:00 Horário de Brasília)",
        version: "2026.11.16-auto-backup-v1",
        timestamp: new Date().toISOString()
      }, null, 2), {
        headers: { "Content-Type": "application/json", ...CORS_HEADERS, ...SECURITY_HEADERS }
      });
    }

    // 4. Servir assets estáticos compilados em dist/ (SPA + PWA)
    if (env.ASSETS) {
      try {
        const assetResponse = await env.ASSETS.fetch(request);
        
        // Headers para HTML (Index) — NUNCA GUARDAR EM CACHE PARA GARANTIR ATUALIZAÇÃO IMEDIATA EM TODOS OS DISPOSITIVOS
        if (url.pathname === "/" || url.pathname === "/index.html" || url.pathname.endsWith(".html")) {
          return addSecurityHeaders(assetResponse, {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
          });
        }

        // Headers customizados para PWA Manifest
        if (url.pathname === "/manifest.json" || url.pathname === "/manifest.webmanifest") {
          return addSecurityHeaders(assetResponse, {
            "Content-Type": "application/manifest+json; charset=utf-8",
            "Cache-Control": "no-cache, no-store, must-revalidate"
          });
        }

        // Headers para o Service Worker (NUNCA DEVE SER CACHEADO)
        if (url.pathname === "/sw.js") {
          return addSecurityHeaders(assetResponse, {
            "Content-Type": "application/javascript; charset=utf-8",
            "Service-Worker-Allowed": "/",
            "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0"
          });
        }

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
