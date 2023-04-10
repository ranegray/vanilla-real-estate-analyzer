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

// protected api route
app.use('/api', protect, router)

// signin/registration routes
app.post('/user', createNewUser)
app.post('/signin', signIn)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
