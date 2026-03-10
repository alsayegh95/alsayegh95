const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const dir = path.join(__dirname, "dist");
const mime = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon" };
const cronDir = path.join(os.homedir(), ".openclaw", "cron");
const cronPath = path.join(cronDir, "jobs.json");
const runsDir = path.join(cronDir, "runs");
const agentsDir = path.join(os.homedir(), ".openclaw", "agents");
const activityLogPath = path.join(os.homedir(), ".openclaw", "activity.jsonl");

// App login auth (set env vars to override defaults)
const BASIC_AUTH_USER = process.env.DB_BASIC_AUTH_USER || "alsayegh";
const BASIC_AUTH_PASS_HASH = process.env.DB_BASIC_AUTH_PASS_HASH || "cd4c57086117d8ab5acdc315a7cd02e32b0882aff09d098688a5e2e84d397764";
const AUTH_COOKIE_NAME = "db_auth";
const AUTH_COOKIE_VALUE = sha256(BASIC_AUTH_USER + ":" + BASIC_AUTH_PASS_HASH).slice(0, 32);

function sha256(s) {
  return crypto.createHash("sha256").update(String(s || ""), "utf8").digest("hex");
}

function isAuthorized(req) {
  var h = req.headers && req.headers.authorization;
  if (!h || h.indexOf("Basic ") !== 0) return false;
  var raw = "";
  try { raw = Buffer.from(h.slice(6), "base64").toString("utf8"); } catch (e) { return false; }
  var idx = raw.indexOf(":");
  if (idx < 0) return false;
  var user = raw.slice(0, idx);
  var pass = raw.slice(idx + 1);
  if (user !== BASIC_AUTH_USER) return false;
  return sha256(pass) === BASIC_AUTH_PASS_HASH;
}

function requireAuth(req, res) {
  if (isAuthorized(req)) return true;
  res.writeHead(401, {
    "WWW-Authenticate": "Basic realm=\"Mission Control\"",
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "*"
  });
  res.end("Authentication required");
  return false;
}

function parseCookies(req) {
  var h = (req.headers && req.headers.cookie) ? String(req.headers.cookie) : "";
  var out = {};
  h.split(";").forEach(function(part) {
    var i = part.indexOf("=");
    if (i > 0) {
      var k = part.slice(0, i).trim();
      var v = part.slice(i + 1).trim();
      out[k] = v;
    }
  });
  return out;
}

function hasSessionAuth(req) {
  var c = parseCookies(req);
  return c[AUTH_COOKIE_NAME] === AUTH_COOKIE_VALUE;
}

function loginHtml(errorText) {
  var err = errorText ? "<p style='color:#ffb4b4'>" + errorText + "</p>" : "";
  return "<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'>" +
    "<title>Dashboard Login</title><style>body{font-family:Inter,Segoe UI,Arial,sans-serif;background:#faf8f3;color:#1a1a1a;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}.box{width:min(420px,92vw);padding:28px;border-radius:20px;background:#fff;border:1px solid #e5e0d5;box-shadow:0 4px 24px rgba(0,0,0,0.06)}h1{margin:0 0 8px;color:#1a1a1a}p{color:#6b6b6b}.f{display:flex;flex-direction:column;gap:10px;margin-top:12px}input{padding:10px 12px;border-radius:12px;border:1px solid #e5e0d5;background:#faf8f3;color:#1a1a1a}button{margin-top:8px;padding:10px 12px;border:0;border-radius:12px;background:#facc15;color:#1a1a1a;font-weight:700;cursor:pointer}button:hover{background:#eab308}</style></head><body><div class='box'><h1>Dashboard</h1><p>Login required</p>" + err + "<form class='f' method='POST' action='/__login'><input name='username' placeholder='Username' required/><input name='password' type='password' placeholder='Password' required/><button type='submit'>Sign in</button></form></div></body></html>";
}

function parseFormUrlEncoded(body) {
  var obj = {};
  String(body || "").split("&").forEach(function(kv) {
    if (!kv) return;
    var i = kv.indexOf("=");
    var k = i >= 0 ? kv.slice(0, i) : kv;
    var v = i >= 0 ? kv.slice(i + 1) : "";
    obj[decodeURIComponent(k.replace(/\+/g, " "))] = decodeURIComponent(v.replace(/\+/g, " "));
  });
  return obj;
}

function setAuthCookie(res) {
  res.setHeader("Set-Cookie", AUTH_COOKIE_NAME + "=" + AUTH_COOKIE_VALUE + "; Path=/; HttpOnly; SameSite=Lax; Secure");
}

function clearAuthCookie(res) {
  res.setHeader("Set-Cookie", AUTH_COOKIE_NAME + "=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0");
}

function sendJson(res, data, statusCode) {
  res.writeHead(statusCode || 200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
  res.end(JSON.stringify(data));
}

function readManualActivity() {
  var entries = [];
  try {
    var lines = fs.readFileSync(activityLogPath, "utf8").trim().split("\n").filter(Boolean);
    for (var i = 0; i < lines.length; i++) {
      try { entries.push(JSON.parse(lines[i])); } catch(e) {}
    }
  } catch(e) {}
  return entries;
}

function appendActivity(entry) {
  entry.ts = entry.ts || Date.now();
  fs.appendFileSync(activityLogPath, JSON.stringify(entry) + "\n");
  return entry;
}

function readCronJobs() {
  try { return JSON.parse(fs.readFileSync(cronPath, "utf8")).jobs || []; } catch(e) { return []; }
}

function getAllFinishedRuns() {
  var allRuns = [];
  try {
    var files = fs.readdirSync(runsDir).filter(function(f) { return f.endsWith(".jsonl"); });
    for (var fi = 0; fi < files.length; fi++) {
      var lines = fs.readFileSync(path.join(runsDir, files[fi]), "utf8").trim().split("\n").filter(Boolean);
      for (var li = 0; li < lines.length; li++) {
        try {
          var entry = JSON.parse(lines[li]);
          if (entry.action === "finished") allRuns.push(entry);
        } catch(e2) {}
      }
    }
  } catch(e) {}
  return allRuns;
}

function readRecentRuns(limit) {
  var jobs = readCronJobs();
  var jobMap = {};
  for (var i = 0; i < jobs.length; i++) jobMap[jobs[i].id] = jobs[i];
  var allRuns = getAllFinishedRuns();
  var mapped = [];
  for (var ri = 0; ri < allRuns.length; ri++) {
    var entry = allRuns[ri];
    var job = jobMap[entry.jobId];
    mapped.push({ ts: entry.ts, jobId: entry.jobId, jobName: job ? job.name : entry.jobId, agentId: job ? (job.agentId || null) : null, status: entry.status || "unknown", summary: entry.summary || "", durationMs: entry.durationMs || 0, model: entry.model || "", delivered: !!entry.delivered });
  }
  // Merge manual activity entries
  var manualEntries = readManualActivity();
  for (var mi = 0; mi < manualEntries.length; mi++) {
    var me = manualEntries[mi];
    mapped.push({ ts: me.ts, jobId: me.jobId || "manual", jobName: me.jobName || "Manual Action", agentId: me.agentId || null, status: me.status || "ok", summary: me.summary || "", durationMs: me.durationMs || 0, model: me.model || "", delivered: !!me.delivered });
  }
  mapped.sort(function(a, b) { return b.ts - a.ts; });
  return mapped.slice(0, limit || 20);
}

function tokenUsage7d() {
  var now = Date.now();
  var sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

  // Build day buckets
  var dayLabels = [];
  var buckets = {};
  for (var d = 6; d >= 0; d--) {
    var dt = new Date(now - d * 24 * 60 * 60 * 1000);
    var label = dt.toLocaleDateString("en-US", { weekday: "short" });
    var key = dt.toISOString().slice(0, 10);
    dayLabels.push({ label: label, key: key });
    buckets[key] = { opus: 0, codex: 0 };
  }

  // 1) Cron runs - per run with timestamps and usage
  var allRuns = getAllFinishedRuns();
  for (var ri = 0; ri < allRuns.length; ri++) {
    var run = allRuns[ri];
    if (run.ts < sevenDaysAgo) continue;
    var dateKey = new Date(run.ts).toISOString().slice(0, 10);
    if (!buckets[dateKey]) continue;
    var tokens = (run.usage && run.usage.total_tokens) ? run.usage.total_tokens : 0;
    var model = (run.model || "").toLowerCase();
    if (model.indexOf("codex") >= 0 || model.indexOf("gpt") >= 0 || model.indexOf("openai") >= 0) {
      buckets[dateKey].codex += tokens;
    } else {
      buckets[dateKey].opus += tokens;
    }
  }

  // 2) Session transcripts - scan .jsonl files for per-day estimation
  // Parse each session transcript, group messages by date, estimate tokens from message sizes
  try {
    var agentDirs = fs.readdirSync(agentsDir);
    for (var ai = 0; ai < agentDirs.length; ai++) {
      var sessDir = path.join(agentsDir, agentDirs[ai], "sessions");
      if (!fs.existsSync(sessDir)) continue;

      // Read sessions.json to get model info per session
      var sessMetaPath = path.join(sessDir, "sessions.json");
      var sessMeta = {};
      try { sessMeta = JSON.parse(fs.readFileSync(sessMetaPath, "utf8")); } catch(e) {}

      var sessFiles = fs.readdirSync(sessDir).filter(function(f) {
        return f.endsWith(".jsonl") && !f.includes("deleted") && !f.includes("reset");
      });

      for (var si = 0; si < sessFiles.length; si++) {
        var sfPath = path.join(sessDir, sessFiles[si]);
        var stat = fs.statSync(sfPath);
        if (stat.mtimeMs < sevenDaysAgo) continue; // skip old files

        // Find matching session meta for model info
        var sessId = sessFiles[si].replace(".jsonl", "");
        var sessionModel = "opus"; // default
        var metaKeys = Object.keys(sessMeta);
        for (var mk = 0; mk < metaKeys.length; mk++) {
          var sm = sessMeta[metaKeys[mk]];
          if (sm.sessionId === sessId) {
            var mname = (sm.model || "").toLowerCase();
            if (mname.indexOf("codex") >= 0 || mname.indexOf("gpt") >= 0) sessionModel = "codex";
            break;
          }
        }

        // Skip cron run sessions (already counted above)
        var isCronSession = sessFiles[si].length === 41; // UUID.jsonl = 36+5
        var isCronRun = false;
        for (var mk2 = 0; mk2 < metaKeys.length; mk2++) {
          if (metaKeys[mk2].indexOf("cron") >= 0) {
            var sm2 = sessMeta[metaKeys[mk2]];
            if (sm2.sessionId === sessId) { isCronRun = true; break; }
          }
        }
        if (isCronRun) continue;

        // Read transcript and group by date
        try {
          var lines = fs.readFileSync(sfPath, "utf8").trim().split("\n").filter(Boolean);
          for (var li = 0; li < lines.length; li++) {
            try {
              var msg = JSON.parse(lines[li]);
              if (!msg.timestamp) continue;
              var msgDate = msg.timestamp.slice(0, 10);
              if (!buckets[msgDate]) continue;
              if (msg.type !== "message") continue;
              // Estimate tokens from content size (~4 chars per token)
              var content = "";
              if (msg.message && msg.message.content) {
                if (typeof msg.message.content === "string") {
                  content = msg.message.content;
                } else if (Array.isArray(msg.message.content)) {
                  for (var ci = 0; ci < msg.message.content.length; ci++) {
                    var block = msg.message.content[ci];
                    if (block.text) content += block.text;
                    else if (block.arguments) content += JSON.stringify(block.arguments);
                  }
                }
              }
              var estTokens = Math.ceil(content.length / 4);
              buckets[msgDate][sessionModel] += estTokens;
            } catch(e3) {}
          }
        } catch(e4) {}
      }
    }
  } catch(e) {}

  var result = [];
  for (var di = 0; di < dayLabels.length; di++) {
    var k = dayLabels[di].key;
    result.push({ day: dayLabels[di].label, date: k, opus: buckets[k].opus, codex: buckets[k].codex });
  }
  return result;
}

function hostOnly(req) {
  var h = (req.headers && req.headers.host) ? String(req.headers.host) : "";
  return h.split(":")[0].toLowerCase();
}

function isMissionHost(host) {
  return host === "mission.abdullahalsayegh.sa";
}

function isDashboardHost(host) {
  return host === "dashboard.abdullahalsayegh.sa";
}

function isForumHost(host) {
  return host === "forum.abdullahalsayegh.sa";
}

function isPortalHost(host) {
  return host === "abdullahalsayegh.sa" || host === "www.abdullahalsayegh.sa";
}

function sendHtml(res, html, statusCode) {
  res.writeHead(statusCode || 200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

function isStaticAssetPath(url) {
  return url.indexOf("/assets/") === 0 ||
    url === "/favicon.ico" ||
    url === "/robots.txt" ||
    url === "/manifest.webmanifest";
}

function portalHtml() {
  return "<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'>" +
    "<title>Abdullah Alsayegh</title><style>body{font-family:Inter,Segoe UI,Arial,sans-serif;background:#0b1220;color:#e7eefc;margin:0}.wrap{max-width:980px;margin:60px auto;padding:24px}h1{font-size:32px;margin:0 0 10px}p{color:#a9b7d0}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;margin-top:28px}.card{display:block;padding:24px;border-radius:16px;background:linear-gradient(135deg,#14213d,#1f2f58);border:1px solid #2a3f75;color:#fff;text-decoration:none}.card h2{margin:0 0 8px;font-size:24px}.card span{color:#bcd0ff}.foot{margin-top:36px;color:#8ea2c7;font-size:13px}</style></head><body><div class='wrap'><h1>Abdullah Alsayegh</h1><p>Select a destination:</p><div class='grid'><a class='card' href='https://mission.abdullahalsayegh.sa'><h2>Mission Control</h2><span>Agent operations dashboard</span></a><a class='card' href='https://forum.abdullahalsayegh.sa'><h2>Forum</h2><span>Community space (coming soon)</span></a></div><div class='foot'>© 2026 Abdullah Alsayegh</div></div></body></html>";
}

function forumHtml() {
  return "<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><title>Forum - Coming Soon</title><style>body{font-family:Inter,Segoe UI,Arial,sans-serif;background:#0b1220;color:#e7eefc;display:flex;align-items:center;justify-content:center;height:100vh;margin:0} .box{max-width:760px;padding:30px;border-radius:16px;background:#14213d;border:1px solid #2a3f75} h1{margin:0 0 10px} p{color:#b7c7e6} a{color:#9ec1ff}</style></head><body><div class='box'><h1>Forum — Coming Soon</h1><p>This area is reserved for Abdullah's upcoming forum.</p><p><a href='https://abdullahalsayegh.sa'>Back to main portal</a></p></div></body></html>";
}

var server = http.createServer(function(req, res) {
  var url = (req.url || "").split("?")[0];
  var host = hostOnly(req);

  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization" });
    return res.end();
  }

  // Public portal and forum pages
  if (isPortalHost(host)) return sendHtml(res, portalHtml(), 200);
  if (isForumHost(host)) return sendHtml(res, forumHtml(), 200);

  // Dashboard host uses app-login + secure cookie session
  if (isDashboardHost(host)) {
    if (url === "/logout") {
      clearAuthCookie(res);
      res.writeHead(302, { "Location": "/" });
      return res.end();
    }

    if (url === "/__login" && req.method === "POST") {
      var raw = "";
      req.on("data", function(c) { raw += c; });
      req.on("end", function() {
        var form = parseFormUrlEncoded(raw);
        var u = form.username || "";
        var p = form.password || "";
        if (u === BASIC_AUTH_USER && sha256(p) === BASIC_AUTH_PASS_HASH) {
          setAuthCookie(res);
          res.writeHead(302, { "Location": "/" });
          return res.end();
        }
        return sendHtml(res, loginHtml("Invalid username or password"), 401);
      });
      return;
    }

    // Allow login page and static assets without session
    if (!hasSessionAuth(req) && !isStaticAssetPath(url)) {
      return sendHtml(res, loginHtml(""), 200);
    }
  } else {
    // Any non-portal/non-forum/non-mission host: keep basic auth fallback
    if (!isStaticAssetPath(url) && !requireAuth(req, res)) return;
  }

  if (url === "/api/cron/jobs") return sendJson(res, readCronJobs());
  if (url === "/api/activity/recent") return sendJson(res, readRecentRuns(50));
  if (url === "/api/tokens/7d") return sendJson(res, tokenUsage7d());

  // GET /api/activity/agent/:agentId — activity filtered by agent
  var agentMatch = url.match(/^\/api\/activity\/agent\/([a-z0-9-]+)$/);
  if (agentMatch && req.method === "GET") {
    var agentId = agentMatch[1];
    var allRuns = readRecentRuns(100);
    var agentRuns = allRuns.filter(function(r) { return r.agentId === agentId; });
    return sendJson(res, agentRuns.slice(0, 20));
  }

  // POST /api/activity — log a manual activity entry
  if (url === "/api/activity" && req.method === "POST") {
    var body = "";
    req.on("data", function(chunk) { body += chunk; });
    req.on("end", function() {
      try {
        var entry = JSON.parse(body);
        var saved = appendActivity(entry);
        return sendJson(res, { ok: true, entry: saved }, 201);
      } catch(e) {
        return sendJson(res, { ok: false, error: "Invalid JSON" }, 400);
      }
    });
    return;
  }
  var fp = path.join(dir, url === "/" ? "index.html" : url);
  if (!fs.existsSync(fp)) fp = path.join(dir, "index.html");
  var ext = path.extname(fp);
  res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream", "Access-Control-Allow-Origin": "*" });
  fs.createReadStream(fp).pipe(res);
});
server.listen(4002, "0.0.0.0", function() { console.log("Dashboard running on http://0.0.0.0:4002"); });