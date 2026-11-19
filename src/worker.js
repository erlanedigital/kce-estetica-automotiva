/**
 * Cloudflare Worker — KCL Estética Automotiva
 * Subdomínio Oficial: kcl.emia.workers.dev
 * Lava-jato Premium em Montes Claros - MG
 * Persistência Permanente em Cloudflare D1 (kcl-estetica-db), Backup, Restore e SPA/PWA
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
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Api-Key",
  "Access-Control-Max-Age": "86400"
};

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
  "Pragma": "no-cache"
};

const BACKUP_BLOAT_KEYS = new Set([
  "kce_rec_kce_backups",
  "kce_db_snapshots",
  "kce_backup_history"
]);

let schemaReady = false;

async function ensureSchema(db) {
  if (schemaReady || !db) return;
  await db.batch([
    db.prepare(
      "CREATE TABLE IF NOT EXISTS kcl_records (collection TEXT NOT NULL, id TEXT NOT NULL, value TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (datetime('now')), PRIMARY KEY (collection, id))"
    ),
    db.prepare(
      "CREATE INDEX IF NOT EXISTS idx_kcl_records_collection ON kcl_records(collection)"
    ),
    db.prepare(
      "CREATE TABLE IF NOT EXISTS kcl_kv (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (datetime('now')))"
    )
  ]);
  schemaReady = true;
}

function safeParseJson(raw) {
  if (typeof raw !== "string") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function isAllowedKvKey(key) {
  if (typeof key !== "string" || !key.trim()) return false;
  if (BACKUP_BLOAT_KEYS.has(key) || key.startsWith("kce_rec_")) return false;
  return key.startsWith("kce_") || key.startsWith("kcl_");
}

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

function jsonResponse(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
      ...SECURITY_HEADERS,
      ...NO_STORE_HEADERS,
      ...extraHeaders
    }
  });
}

async function pruneBackups(db) {
  await db
    .prepare(
      "DELETE FROM kcl_records WHERE collection = 'kce_backups' AND id NOT IN (SELECT id FROM kcl_records WHERE collection = 'kce_backups' ORDER BY rowid DESC LIMIT 10)"
    )
    .run();
}

async function generateSystemBackupSnapshot(db, triggerType = "auto_midnight") {
  await ensureSchema(db);
  const now = new Date();
  const [recRes, kvRes] = await db.batch([
    db.prepare(
      "SELECT collection, id, value FROM kcl_records WHERE collection != 'kce_backups' ORDER BY collection ASC, rowid ASC"
    ),
    db.prepare("SELECT key, value FROM kcl_kv ORDER BY key ASC")
  ]);

  const collections = {};
  for (const row of recRes.results || []) {
    if (!collections[row.collection]) collections[row.collection] = [];
    collections[row.collection].push({
      id: row.id,
      value: safeParseJson(row.value)
    });
  }

  const kv = {};
  for (const row of kvRes.results || []) {
    kv[row.key] = safeParseJson(row.value);
  }

  return {
    meta: {
      app: "KCL Estética Automotiva",
      domain: "kcl.emia.workers.dev",
      trigger: triggerType,
      timestamp: now.toISOString(),
      date: now.toISOString().split("T")[0],
      serverTimeBRT: now.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
    },
    collections,
    kv
  };
}

export default {
  // Rotina Cron Agendada: Dispara todo dia à meia-noite (00:00 BRT / 03:00 UTC)
  async scheduled(event, env, ctx) {
    if (!env || !env.DB) return;
    console.log("⏰ [CRON WORKER] Executando rotina diária de backup da meia-noite...");
    const snapshot = await generateSystemBackupSnapshot(env.DB, "cron_worker_midnight");
    const id = "backup-cron-midnight-" + snapshot.meta.date;

    await env.DB
      .prepare(
        "INSERT INTO kcl_records (collection, id, value, updated_at) VALUES ('kce_backups', ?, ?, datetime('now')) ON CONFLICT(collection, id) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at"
      )
      .bind(id, JSON.stringify(snapshot))
      .run();
    await pruneBackups(env.DB);

    if (env.GDRIVE_WEBHOOK_URL) {
      try {
        await fetch(env.GDRIVE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: `kcl_backup_auto_${snapshot.meta.date}.json`,
            content: JSON.stringify(snapshot, null, 2),
            timestamp: snapshot.meta.timestamp,
            source: "Cloudflare Worker Cron (D1)"
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

    // 1. Backend Actions API Handler (Cloudflare D1)
    if (url.pathname === "/actions" || url.pathname === "actions") {
      if (!env || !env.DB) {
        return jsonResponse({ error: "Banco de dados D1 não configurado." }, 500);
      }
      try {
        await ensureSchema(env.DB);
        const body = await request.json();
        const action = body.action;
        const args = body.args || {};
        const col = args.collection || "default";

        let result = {};

        if (action === "records.list") {
          const { results } = await env.DB
            .prepare("SELECT id, value FROM kcl_records WHERE collection = ? ORDER BY rowid ASC")
            .bind(col)
            .all();
          result = {
            records: (results || []).map((row) => ({
              id: row.id,
              value: safeParseJson(row.value)
            }))
          };
        } else if (action === "records.create") {
          const id =
            args.idempotency_key ||
            ("rec_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8));
          const valObj = args.value ?? {};
          await env.DB
            .prepare(
              "INSERT INTO kcl_records (collection, id, value, updated_at) VALUES (?, ?, ?, datetime('now')) ON CONFLICT(collection, id) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at"
            )
            .bind(col, id, JSON.stringify(valObj))
            .run();
          if (col === "kce_backups") {
            await pruneBackups(env.DB);
          }
          result = { record: { id, value: valObj } };
        } else if (action === "records.replace") {
          const id = args.id;
          if (!id) {
            return jsonResponse({ error: "ID obrigatório para atualização." }, 400);
          }
          const valObj = args.value ?? {};
          await env.DB
            .prepare(
              "INSERT INTO kcl_records (collection, id, value, updated_at) VALUES (?, ?, ?, datetime('now')) ON CONFLICT(collection, id) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at"
            )
            .bind(col, id, JSON.stringify(valObj))
            .run();
          result = { record: { id, value: valObj } };
        } else if (action === "records.delete") {
          await env.DB
            .prepare("DELETE FROM kcl_records WHERE collection = ? AND id = ?")
            .bind(col, args.id || "")
            .run();
          result = { success: true };
        } else if (action === "records.get") {
          const row = await env.DB
            .prepare("SELECT id, value FROM kcl_records WHERE collection = ? AND id = ?")
            .bind(col, args.id || "")
            .first();
          result = {
            record: row ? { id: row.id, value: safeParseJson(row.value) } : null
          };
        }

        return jsonResponse({ data: result }, 200);
      } catch (err) {
        return jsonResponse({ error: err.message }, 500);
      }
    }

    // 2. Key-Value Config Endpoint (Listas Mestras, Mídias, Fidelidade, Parcerias, etc.)
    if (url.pathname === "/api/kv") {
      if (!env || !env.DB) {
        return jsonResponse({ error: "Banco de dados D1 não configurado." }, 500);
      }
      try {
        await ensureSchema(env.DB);

        if (request.method === "GET") {
          const { results } = await env.DB
            .prepare("SELECT key, value FROM kcl_kv ORDER BY key ASC")
            .all();
          const kv = {};
          for (const row of results || []) {
            if (isAllowedKvKey(row.key)) {
              kv[row.key] = row.value;
            }
          }
          return jsonResponse({ data: { kv } }, 200);
        }

        if (request.method === "POST" || request.method === "PUT") {
          const body = await request.json();
          const key = body.key;
          if (!isAllowedKvKey(key)) {
            return jsonResponse({ error: "Chave KV não permitida." }, 400);
          }
          const rawVal =
            typeof body.value === "string" ? body.value : JSON.stringify(body.value ?? null);
          await env.DB
            .prepare(
              "INSERT INTO kcl_kv (key, value, updated_at) VALUES (?, ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at"
            )
            .bind(key, rawVal)
            .run();
          return jsonResponse({ data: { success: true, key } }, 200);
        }

        if (request.method === "DELETE") {
          const key = url.searchParams.get("key") || "";
          if (key) {
            await env.DB.prepare("DELETE FROM kcl_kv WHERE key = ?").bind(key).run();
          }
          return jsonResponse({ data: { success: true } }, 200);
        }

        return jsonResponse({ error: "Método não suportado." }, 405);
      } catch (err) {
        return jsonResponse({ error: err.message }, 500);
      }
    }

    // 3. Endpoint de Backup Dedicado (Cloudflare D1 - sem recursão)
    if (url.pathname === "/api/backup") {
      if (!env || !env.DB) {
        return jsonResponse({ error: "Banco de dados D1 não configurado." }, 500);
      }
      try {
        if (request.method === "GET") {
          const snapshot = await generateSystemBackupSnapshot(env.DB, "manual_api_get");
          const headers = {
            "Content-Type": "application/json; charset=utf-8",
            ...CORS_HEADERS,
            ...SECURITY_HEADERS,
            ...NO_STORE_HEADERS
          };
          if (url.searchParams.get("download") === "1") {
            headers["Content-Disposition"] = `attachment; filename="kcl_backup_${new Date().toISOString().split("T")[0]}.json"`;
          }
          return new Response(JSON.stringify(snapshot, null, 2), { status: 200, headers });
        }

        if (request.method === "POST") {
          const payload = await request.json().catch(() => ({}));
          const snapshot = await generateSystemBackupSnapshot(
            env.DB,
            payload.trigger || "manual_database"
          );
          const id = "backup-manual-" + Date.now();
          await env.DB
            .prepare(
              "INSERT INTO kcl_records (collection, id, value, updated_at) VALUES ('kce_backups', ?, ?, datetime('now')) ON CONFLICT(collection, id) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at"
            )
            .bind(id, JSON.stringify(snapshot))
            .run();
          await pruneBackups(env.DB);

          const driveWebhook = payload.gdriveWebhook || env.GDRIVE_WEBHOOK_URL;
          let gdriveStatus = "not_configured";
          if (driveWebhook && String(driveWebhook).startsWith("http")) {
            try {
              await fetch(driveWebhook, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  filename: `kcl_backup_${snapshot.meta.date}.json`,
                  content: JSON.stringify(snapshot, null, 2),
                  timestamp: snapshot.meta.timestamp
                })
              });
              gdriveStatus = "sent";
            } catch (e) {
              gdriveStatus = "error: " + e.message;
            }
          }

          return jsonResponse({ success: true, id, gdriveStatus }, 200);
        }
      } catch (err) {
        return jsonResponse({ error: err.message }, 500);
      }
    }

    // 4. Endpoint de Restauração de Backup (.JSON)
    if (url.pathname === "/api/restore" && request.method === "POST") {
      if (!env || !env.DB) {
        return jsonResponse({ error: "Banco de dados D1 não configurado." }, 500);
      }
      try {
        await ensureSchema(env.DB);
        const payload = await request.json();
        const stmts = [];
        let restoredRecords = 0;
        let restoredKv = 0;

        // Formato D1 atual: { collections: { colName: [{ id, value }] }, kv: { key: val } }
        if (payload && payload.collections && typeof payload.collections === "object") {
          for (const [col, list] of Object.entries(payload.collections)) {
            if (col === "kce_backups" || !Array.isArray(list)) continue;
            for (const item of list) {
              if (!item || !item.id) continue;
              stmts.push(
                env.DB
                  .prepare(
                    "INSERT INTO kcl_records (collection, id, value, updated_at) VALUES (?, ?, ?, datetime('now')) ON CONFLICT(collection, id) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at"
                  )
                  .bind(col, String(item.id), JSON.stringify(item.value ?? {}))
              );
              restoredRecords++;
            }
          }
        }

        if (payload && payload.kv && typeof payload.kv === "object") {
          for (const [key, val] of Object.entries(payload.kv)) {
            if (!isAllowedKvKey(key)) continue;
            const rawVal = typeof val === "string" ? val : JSON.stringify(val ?? null);
            stmts.push(
              env.DB
                .prepare(
                  "INSERT INTO kcl_kv (key, value, updated_at) VALUES (?, ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at"
                )
                .bind(key, rawVal)
            );
            restoredKv++;
          }
        }

        // Suporte ao formato legado: { localStorage: { "kce_rec_...": [...], "kce_...": ... } }
        if (payload && payload.localStorage && typeof payload.localStorage === "object") {
          for (const [key, val] of Object.entries(payload.localStorage)) {
            if (BACKUP_BLOAT_KEYS.has(key)) continue;
            if (key.startsWith("kce_rec_")) {
              const col = key.replace("kce_rec_", "");
              if (col === "kce_backups") continue;
              const list = Array.isArray(val) ? val : safeParseJson(val);
              if (Array.isArray(list)) {
                for (const item of list) {
                  if (!item || !item.id) continue;
                  stmts.push(
                    env.DB
                      .prepare(
                        "INSERT INTO kcl_records (collection, id, value, updated_at) VALUES (?, ?, ?, datetime('now')) ON CONFLICT(collection, id) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at"
                      )
                      .bind(col, String(item.id), JSON.stringify(item.value ?? {}))
                  );
                  restoredRecords++;
                }
              }
            } else if (isAllowedKvKey(key)) {
              const rawVal = typeof val === "string" ? val : JSON.stringify(val ?? null);
              stmts.push(
                env.DB
                  .prepare(
                    "INSERT INTO kcl_kv (key, value, updated_at) VALUES (?, ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at"
                  )
                  .bind(key, rawVal)
              );
              restoredKv++;
            }
          }
        }

        for (let i = 0; i < stmts.length; i += 50) {
          await env.DB.batch(stmts.slice(i, i + 50));
        }

        return jsonResponse({ success: true, restoredRecords, restoredKv }, 200);
      } catch (err) {
        return jsonResponse({ error: err.message }, 500);
      }
    }

    // 5. Health check
    if (url.pathname === "/api/health") {
      return jsonResponse({
        status: "online",
        project: "kcl-estetica-automotiva",
        domain: "kcl.emia.workers.dev",
        establishment: "KCL Estética Automotiva",
        location: "Montes Claros - MG",
        database: env && env.DB ? "cloudflare-d1" : "unavailable",
        pwa: true,
        lgpd: true,
        backupMidnightCron: "0 3 * * * (00:00 Horário de Brasília)",
        version: "2026.11.19-d1-permanent-v2",
        timestamp: new Date().toISOString()
      }, 200);
    }

    // 6. Servir assets estáticos compilados em dist/ (SPA + PWA)
    if (env && env.ASSETS) {
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
