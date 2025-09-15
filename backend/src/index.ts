import express, { Request, Response } from "express";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

const app = express();


app.use(cors(corsOptions));


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
        res.json(response.data);
    } catch (err) {
        const error = err as AxiosError;
        res.status(500).json({
            error: error.response?.data || error.message,
        });
    }
});

app.get("/api/get-directions", async (req: Request, res: Response) => {
    // ... your existing code
    const { origin, destination } = req.query;
    const profile = req.query.profile || 'driving';
    const resource = req.query.resource || 'route';
    if (!origin || !destination) {
        return res.status(400).json({ error: "Origin and destination are required." });
    }
    const coordinates = `${(origin as string).split(',').reverse().join(',')};${(destination as string).split(',').reverse().join(',')}`;
    const apiKey = process.env.MAPPLS_REST_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "API key is not configured on the server." });
    }
    const url = `https://apis.mappls.com/advancedmaps/v1/${apiKey}/route_adv/${profile}/${coordinates}?geometries=geojson&overview=full&steps=true&resource=${resource}`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (err) {
        const error = err as AxiosError;
        console.error("Directions API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch directions from Mappls API." });
    }
});

app.get("/api/get-directions-multi", async (req: Request, res: Response) => {
    // ... your existing code
    const { path } = req.query;
    const profile = req.query.profile || 'driving';
    const resource = req.query.resource || 'route';
    if (!path || typeof path !== 'string' || path.split(';').length < 2) {
        return res.status(400).json({ error: "A path with at least two coordinates (origin and destination) is required." });
    }
    const apiKey = process.env.MAPPLS_REST_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "API key is not configured on the server." });
    }
    const url = `https://apis.mappls.com/advancedmaps/v1/${apiKey}/route_adv/${profile}/${path}?geometries=geojson&overview=full&steps=true&resource=${resource}`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (err) {
        const error = err as AxiosError;
        console.error("Directions API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch directions from Mappls API." });
    }
});

app.post("/stream-itinerary", async (req: Request, res: Response) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });
    
    req.on("end", async () => {
        // IMPROVED: Moved try/catch inside the 'end' handler to catch parsing errors
        try {
            const { user_prompt } = JSON.parse(body);

            const apiRes = await axios({
                method: "POST",
                url: "https://promptyatra-1052532391820.europe-west1.run.app/stream-itinerary",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: { user_prompt },
                responseType: "stream",
            });

            res.setHeader("Content-Type", "application/json");
            apiRes.data.pipe(res);
        } catch (err) {
            console.error("Error in /stream-itinerary:", err);
            res.status(500).json({ error: "Failed to stream itinerary." });
        }
    });
});



app.listen(5000, () => {
    console.log("✅ Server running on http://localhost:5000");
});