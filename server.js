import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
dotenv.config();
import pg from "pg";
import { comparePasswords, CreateJWT, hashPassword } from "./auth.js";
const { Pool } = pg;

const port = process.env.PORT || 3000;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.static("client"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.status(200);
  res.json({ message: "server is connected" });
});
app.get("/api/properties", async (req, res) => {
  const properties = await pool.query(
    "SELECT * FROM properties WHERE deleted_at IS NULL"
  );
  res.json({ data: properties.rows });
});
// app.get("/api/properties/:id", async (req, res) => {
//   const property = await pool.query("SELECT * FROM properties WHERE id = $1", [
//     req.params.id,
//   ]);
//   res.json({ data: property.rows[0] });
// });
app.post("/api/properties", (req, res) => {
  pool.query(
    "INSERT INTO properties (name, address, purchase_price, interest_rate, down_payment, loan_length, rental_income, expenses, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())",
    [
      req.body.name,
      req.body.address,
      req.body.purchase_price,
      req.body.interest_rate,
      req.body.down_payment,
      req.body.loan_length,
      req.body.rental_income,
      req.body.expenses,
    ]
  );
  res.json({ message: "success" });
});
app.patch("/api/properties/:id", async (req, res) => {
  try {
    await pool.query(
      "UPDATE properties SET name = $1, address = $2, purchase_price = $3, interest_rate = $4, down_payment = $5, loan_length = $6, rental_income = $7, expenses = $8, updated_at = NOW() WHERE id = $9",
      [
        req.body.name,
        req.body.address,
        req.body.purchase_price,
        req.body.interest_rate,
        req.body.down_payment,
        req.body.loan_length,
        req.body.rental_income,
        req.body.expenses,
        req.params.id,
      ]
    );
    res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Bad Request" });
  }
});
app.delete("/api/properties/:id", (req, res) => {
  pool.query("UPDATE properties SET deleted_at = NOW() WHERE id = $1", [
    req.params.id,
  ]);
  res.json({ message: "success" });
});

// authentication
let options = {
  maxAge: 1000 * 60 * 15, // would expire after 15 minutes
  httpOnly: true, // The cookie only accessible by the web server
  signed: false, // Indicates if the cookie should be signed
};

// register route
app.post("/register", async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  const result = await pool.query(
    "INSERT INTO users (username, password, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *",
    [req.body.username, hashedPassword]
  );

  const user = result.rows[0];

  const token = CreateJWT(user);
  res.cookie("authorization", { token }, options);
  res.json({ message: "Signup successful" });
});
// signin route
app.post("/signin", async (req, res) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    req.body.username,
  ]);

  const user = result.rows[0];

  if (!user) {
    res.status(401);
    res.send("User not found");
    return;
  }

  const password = await comparePasswords(req.body.password, user.password);

  if (!password) {
    res.status(401);
    res.send("Nope");
    return;
  }

  const token = CreateJWT(user);
  res.cookie("authorization", { token }, options);
  res.send("Login successful");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
