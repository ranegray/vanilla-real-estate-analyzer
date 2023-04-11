import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv'
dotenv.config()
import pg from "pg";
const { Pool } = pg;

const port = process.env.PORT || 3000;
const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.status(200);
  res.json({ message: "server is connected" });
});
app.get("/api/properties", async (req, res) => {
  const properties = await pool.query('SELECT * FROM properties')
  res.json({data: properties.rows})
});
app.get("/properties/:id", (req, res) => {});
app.post("/properties", (req, res) => {});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})