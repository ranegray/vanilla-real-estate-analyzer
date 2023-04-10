import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config()
const port = process.env.PORT || 3000;
const connectionString = process.env.DATABASE_URL

const { Pool } = pg;
const pool = new Pool({ connectionString })

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('test is working, server is on')
})

// api routes


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
