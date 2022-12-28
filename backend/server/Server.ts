import express from "express";
import path from "path";
import http from "http";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.static(path.join(process.cwd(), "backend", "static")));

http.createServer(app).listen(80);