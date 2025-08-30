const path = require("path");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");

const app = express();
const port = process.env.PORT || 8080;

// Middlewares globais (antes das rotas)
app.use(helmet());
app.use(compression());
app.use(express.json());

// Health/ping
app.get("/healthz", (_req, res) => res.status(200).send("ok"));
app.get("/api/ping", (_req, res) => res.json({ ok: true, ts: Date.now() }));

// Evita 404 de favicon
app.get("/favicon.ico", (_req, res) => res.status(204).end());

// Front estático + raiz
app.use(express.static("public"));
app.get("/", (_req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

// 404 (deixa SEMPRE por último)
app.use((_req, res) => res.status(404).json({ error: "not found" }));

app.listen(port, () => console.log(`Listening on ${port}`));
