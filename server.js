const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Healthcheck
app.get("/healthz", (_req, res) => res.status(200).send("ok"));
// Ping simples
app.get("/api/ping", (_req, res) => res.json({ ok: true, ts: Date.now() }));
// Evita 404 de favicon
app.get("/favicon.ico", (_req, res) => res.status(204).end());

// Servir front estático
app.use(express.static("public"));
app.get("/", (_req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

// 404 padrão
app.use((_req, res) => res.status(404).json({ error: "not found" }));

app.listen(port, () => console.log(`Listening on ${port}`));
