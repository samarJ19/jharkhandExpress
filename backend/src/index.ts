import express, { Request, Response } from "express";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import cors from "cors";
import { PassThrough } from "stream";
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

app.get("/api/get-directions", async (req: Request, res: Response) => {
  const { origin, destination } = req.query;

  // Set default values, which can be overridden by query params from the frontend
  const profile = req.query.profile || 'driving'; // driving, walking, biking
  const resource = req.query.resource || 'route'; // route, route_eta

  if (!origin || !destination) {
    return res.status(400).json({ error: "Origin and destination are required." });
  }

  const coordinates = `${(origin as string).split(',').reverse().join(',')};${(destination as string).split(',').reverse().join(',')}`;
  
  const apiKey = process.env.MAPPLS_REST_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key is not configured on the server." });
  }

  // Build the URL with additional dynamic parameters
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

const cache = new Map<string, any>();

app.get("/api/get-place-details", async (req: Request, res: Response) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Latitude and longitude are required." });
  }

  const apiKey = process.env.MAPPLS_REST_API_KEY;
  if (!apiKey) {
    console.error("Mappls API key is not configured on the server.");
    return res.status(500).json({ error: "API key is not configured." });
  }

  // --- 1. Check the cache first ---
  const cacheKey = `${lat},${lng}`;
  if (cache.has(cacheKey)) {
    console.log(`[CACHE HIT] for ${cacheKey}`);
    return res.json(cache.get(cacheKey));
  }
  console.log(`[CACHE MISS] for ${cacheKey}`);

  const url = `https://apis.mappls.com/advancedmaps/v1/${apiKey}/rev_geocode?lat=${lat}&lng=${lng}`;

  try {
    const response = await axios.get(url);

    // --- 2. Safely handle the response ---
    if (response.data && response.data.results && response.data.results.length > 0) {
      const placeDetails = response.data.results[0];
      // Store the successful result in the cache
      cache.set(cacheKey, placeDetails);
      res.json(placeDetails);
    } else {
      // Handle case where API returns no results for the coordinate
      res.status(404).json({ error: "No place details found for the given coordinates." });
    }
  } catch (err: any) {
    // --- 3. Improved Error Logging and Handling ---
    const errorStatus = err.response?.status || 500;
    const errorMessage = err.response?.data?.error || "Failed to fetch place details.";
    
    console.error(`Mappls API Error: Status ${errorStatus}`, err.response?.data || err.message);

    // Forward the actual error status from the Mappls API
    res.status(errorStatus).json({ error: errorMessage });
  }
});



app.post("/stream-itinerary", async (req: Request, res: Response) => {
    try {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
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
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to stream itinerary." });
    }
});

app.get("/api/get-directions-multi", async (req: Request, res: Response) => {
  // Accepts a single 'path' query parameter with all coordinates
  const { path } = req.query;

  // Set default values, which can be overridden
  const profile = req.query.profile || 'driving'; // driving, walking, biking
  const resource = req.query.resource || 'route'; // route, route_eta

  if (!path || typeof path !== 'string' || path.split(';').length < 2) {
    return res.status(400).json({ error: "A path with at least two coordinates (origin and destination) is required." });
  }

  const apiKey = process.env.MAPPLS_REST_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key is not configured on the server." });
  }

  // The 'path' variable is used directly as it contains the full coordinate string
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


app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
