import express, { Request, Response } from "express";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const allowedOrigins = ['http://localhost:5173']
const corsOptions = {
    origin: function (origin:any, callback:any) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};


const app = express();
app.use(cors(corsOptions))
app.get("/api/get-mappls-token", async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      "https://outpost.mappls.com/api/security/oauth/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.MAPPLS_CLIENT_ID as string,
        client_secret: process.env.MAPPLS_CLIENT_SECRET as string,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.json(response.data); // send token to frontend
  } catch (err) {
    const error = err as AxiosError;
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
