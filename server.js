import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.status(200);
  res.json({ message: "server is connected" });
});

// api routes
app.get("/api/properties", (req, res) => {});
app.get("/api/properties/:id", (req, res) => {});
app.post("/api/properties", (req, res) => {});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
