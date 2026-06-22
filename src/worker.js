// サーチド出版 — お問い合わせ受信＆管理（Cloudflare Worker + D1）
// 静的ページは assets が配信し、/api/* のみこの Worker が処理する。
// 合言葉（パスワード）はサーバー側で照合し、表には出さない。

const ADMIN_PASS = "searched";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const p = url.pathname;

    try {
      // --- お問い合わせの受信（誰でもPOST可）---
      if (p === "/api/contact" && request.method === "POST") {
        await ensureTable(env);
        const d = await request.json().catch(() => ({}));
        // ハニーポット（bot対策）：値が入っていれば成功を装って破棄
        if (d.company_url) return json({ ok: true });
        const name = clip(d.name, 200);
        const email = clip(d.email, 200);
        const subject = clip(d.subject, 300);
        const message = clip(d.message, 8000);
        if (!name || !email || !message) {
          return json({ ok: false, error: "required" }, 400);
        }
        await env.DB.prepare(
          "INSERT INTO inquiries (name, email, subject, message, ua, created_at) VALUES (?, ?, ?, ?, ?, ?)"
        ).bind(
          name, email, subject, message,
          clip(request.headers.get("user-agent") || "", 300),
          new Date().toISOString()
        ).run();
        return json({ ok: true });
      }

      // --- 管理：一覧取得（合言葉が必要）---
      if (p === "/api/inquiries" && request.method === "POST") {
        const d = await request.json().catch(() => ({}));
        if ((d.password || "") !== ADMIN_PASS) {
          return json({ ok: false, error: "unauthorized" }, 401);
        }
        await ensureTable(env);
        const { results } = await env.DB.prepare(
          "SELECT id, name, email, subject, message, created_at FROM inquiries ORDER BY id DESC LIMIT 1000"
        ).all();
        return json({ ok: true, items: results || [] });
      }

      // --- 管理：削除（合言葉が必要）---
      if (p === "/api/inquiries/delete" && request.method === "POST") {
        const d = await request.json().catch(() => ({}));
        if ((d.password || "") !== ADMIN_PASS) {
          return json({ ok: false, error: "unauthorized" }, 401);
        }
        const id = parseInt(d.id, 10);
        if (id) {
          await ensureTable(env);
          await env.DB.prepare("DELETE FROM inquiries WHERE id = ?").bind(id).run();
        }
        return json({ ok: true });
      }
    } catch (e) {
      return json({ ok: false, error: String(e && e.message || e) }, 500);
    }

    // 内部ファイルは配信しない（合言葉を含む worker / 設定を隠す）
    if (/^\/(src\/|wrangler|package|\.git|\.gitignore|node_modules\/)/i.test(p)) {
      return new Response("Not found", { status: 404 });
    }

    // それ以外は静的ファイルを配信
    return env.ASSETS.fetch(request);
  },
};

function clip(v, n) {
  return (typeof v === "string" ? v : "").trim().slice(0, n);
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

async function ensureTable(env) {
  await env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS inquiries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, subject TEXT, message TEXT, ua TEXT, created_at TEXT)"
  ).run();
}
