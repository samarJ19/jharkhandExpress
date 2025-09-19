import express from "express";  
const router = express.Router();
import { Request, Response } from "express";

// route to register a new admin
router.post("/register", (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Logic to register the new admin
  res.status(201).send("Admin registered successfully");
});
