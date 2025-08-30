const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (_req, res) => res.send("SGQ Arfrio QA - App Hosting OK 🚀"));
app.listen(port, () => console.log(`Listening on ${port}`));
res.send("SGQ Arfrio QA - v2 ✅");
