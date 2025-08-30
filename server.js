const path = require("path");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");

const app = express();
const port = process.env.PORT || 8080;

app.use(helmet());
app.use(compression());
app.use(express.json());

// Health / API
app.get("/healthz", (_req, res) => res.status(200).send("ok"));
app.get("/api/ping", (_req, res) => res.json({ ok: true, ts: Date.now() }));

// Silenciar pedidos comuns se o arquivo não existir (HTTP 204)
app.get("/favicon.ico", (_req, res) => res.status(204).end());
app.get("/apple-touch-icon.png", (_req, res) => res.status(204).end());
app.get("/favicon-32x32.png", (_req, res) => res.status(204).end());
app.get("/favicon-16x16.png", (_req, res) => res.status(204).end());

// Estáticos
app.use(express.static("public"));

// Raiz
app.get("/", (_req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

// Fallback SPA (qualquer rota que não comece com /api)
app.get(/^\/(?!api).*/, (_req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

// 404 final (se sobrar algo)
app.use((_req, res) => res.status(404).json({ error: "not found" }));

app.listen(port, () => console.log(`Listening on ${port}`));
