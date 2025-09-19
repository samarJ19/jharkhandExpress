import { PrismaClient } from "./generated/prisma/client";
import express from "express";
const router = express.Router();
import { Request, Response } from "express";
import { ethers } from "ethers";
const prisma = new PrismaClient();
// route to register a new admin
enum Role {
  ADMIN,
  GUIDE,
  TOURIST,
}
router.post("/register", async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    role,
    walletAddress,
  }: { email: string; password: string; role: Role; walletAddress: string; name: string } =
    req.body;
  // Logic to register the new admin
  if (!email || !password || !role || !walletAddress || !name) {
    return res
      .status(400)
      .json({
        message: "Email, password, role, wallet address and name are required",
      });
  }
  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        //@ts-ignore
        role,
        walletAddress,
        name,
      },
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while registering user" });
  }
});

// route to login an admin
router.post("/login", async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  // Logic to login the admin
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res
      .status(200)
      .json({ message: "Login successful", user, role: Role[user.role] });
  } catch (error) {
    res.status(500).json({ message: "Error while logging in" });
  }
});
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // from deploy
//@ts-ignore
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "guide",
          "type": "address"
        }
      ],
      "name": "GuideVerified",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_guide",
          "type": "address"
        }
      ],
      "name": "isVerified",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "verifiedGuides",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_guide",
          "type": "address"
        }
      ],
      "name": "verifyGuide",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const adminWallet = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // pick one from printed list
  provider
);

// route for verifying tour guide
router.post("/guide/verify", async (req: Request, res: Response) => {
  const { guideId }: { guideId: string } = req.body;
  if (!guideId) {
    return res.status(400).json({ message: "Guide ID is required" });
  }
  try {
    const guide = await prisma.user.findFirst({
      where: {
        id: guideId,
        //@ts-ignore
        role: "GUIDE",
      },
    });
    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }
    //@ts-ignore
    const contract = new ethers.Contract(contractAddress, abi, adminWallet);
    const tx = await contract.verifyGuide(guide.walletAddress);
    const receipt = await tx.wait();
    
    // Verify transaction was successful
    if (receipt.status !== 1) {
      throw new Error("Transaction failed on blockchain");
    }
    
    await prisma.user.update({
      where: { id: guideId },
      data: { 
        verified: true,
        verificationTx: tx.hash
      },
    });
    res.status(200).json({ message: "Guide verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while verifying guide" });
  }
});

// get request to get the verification status of a guide
router.get("/guide/:id/status", async (req: Request, res: Response) => {
  const guideId = req.params.id;
  if (!guideId) {
    return res.status(400).json({ message: "Guide ID is required" });
  }

  try {
    const guide = await prisma.user.findUnique({
      where: { id: guideId },
    });
    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }
    
    //@ts-ignore
    const contract = new ethers.Contract(contractAddress, abi, adminWallet);
    const isVerified = await contract.isVerified(guide.walletAddress);
    
    // Optional: Check consistency with database
    if (guide.verified !== isVerified) {
      console.warn(`Verification mismatch for guide ${guideId}: DB=${guide.verified}, Blockchain=${isVerified}`);
    }
    
    res.status(200).json({ 
      verified: isVerified,
      dbVerified: guide.verified,
      verificationTx: guide.verificationTx
    });
  } catch (error) {
    console.log(error);
    // Check if it's a blockchain connectivity error
    if (error instanceof Error && (error.message?.includes("network") || error.message?.includes("connection"))) {
      return res.status(503).json({ message: "Blockchain network unavailable" });
    }
    res.status(500).json({ message: "Error while fetching guide status" });
  }
});

// route to get all guides
router.get("/guides", async (req: Request, res: Response) => {
  try {
    const guides = await prisma.user.findMany({
      where: { role: "GUIDE" },
    });
    res.status(200).json(guides);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while fetching guides" });
  }
});

export default router;
