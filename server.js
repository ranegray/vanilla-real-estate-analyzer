import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import pg from "pg";
const { Pool } = pg;

const port = process.env.PORT || 3000;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

const app = express();

app.use(cors());
// app.use(express.static('./client'))
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.status(200);
  res.json({ message: "server is connected" });
});
app.get("/api/properties", async (req, res) => {
  const properties = await pool.query("SELECT * FROM properties WHERE deleted_at IS NULL");
  res.json({ data: properties.rows });
});
app.get("/api/properties/:id", async (req, res) => {
  const property = await pool.query("SELECT * FROM properties WHERE id = $1", [
    req.params.id,
  ]);
  res.json({ data: property.rows[0] });
});
app.post("/api/properties", (req, res) => {
  pool.query(
    "INSERT INTO properties (name, address, purchase_price, interest_rate, down_payment, loan_length, rental_income, expenses, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())",
    [req.body.name, req.body.address, req.body.purchase_price, req.body.interest_rate, req.body.down_payment, req.body.loan_length, req.body.rental_income, req.body.expenses]
  );
  res.json({ message: "success" });
});
// app.patch("/api/properties/:id", (req, res) => {
//   pool.query("UPDATE properties SET ")
// })
app.delete("/api/properties/:id", (req, res) => {
  pool.query("UPDATE properties SET deleted_at = NOW() WHERE id = $1", [req.params.id])
  res.json({ message: "success" })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
