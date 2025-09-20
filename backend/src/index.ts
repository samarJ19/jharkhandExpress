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
const bodyParser = require('body-parser');

app.use(cors(corsOptions));
app.use(express.json()); // Add JSON middleware
app.use(bodyParser.json()); // Also keep the existing bodyParser

import router from './adminRoute';

app.use('/api/admin', router);

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
    try {
        const { user_prompt } = req.body;
        
        console.log("Received request with user_prompt:", user_prompt);

        if (!user_prompt) {
            return res.status(400).json({ error: "user_prompt is required" });
        }

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

        console.log("External API response status:", apiRes.status);
        console.log("External API response headers:", apiRes.headers);

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Transfer-Encoding", "chunked");
        
        apiRes.data.pipe(res);
        
        apiRes.data.on('end', () => {
            console.log("Stream completed");
        });
        
        apiRes.data.on('error', (error: any) => {
            console.error("Stream error:", error);
            if (!res.headersSent) {
                res.status(500).json({ error: "Stream error" });
            }
        });
        
    } catch (err) {
        console.error("Error in /stream-itinerary:", err);
        if (!res.headersSent) {
            res.status(500).json({ error: "Failed to stream itinerary." });
        }
    }
});

app.get('/api/google-place-search', async (req, res) => {
  // Get parameters from the frontend request
  const { input, lat, lng } = req.query;

  if (!input || !lat || !lng) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Get key securely from server environment
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is not configured on the server' });
  }

  // Use the NEW Places API (Text Search)
  const searchUrl = `https://places.googleapis.com/v1/places:searchText`;
  
  // Prepare the request body for the new API
  const requestBody = {
    textQuery: input as string,
    locationBias: {
      circle: {
        center: {
          latitude: parseFloat(lat as string),
          longitude: parseFloat(lng as string)
        },
        radius: 2000.0 // 2km radius
      }
    }
  };

  // Headers for the new API
  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': 'places.id,places.displayName,places.photos,places.formattedAddress,places.location',
    'Referer': 'http://localhost:5173', // Add referer header to match your API key restrictions
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  };

  try {
    const response = await axios.post(searchUrl, requestBody, { headers });
    
    // Transform the new API response to match the expected format for your frontend
    const transformedResponse = {
      candidates: response.data.places?.map((place: any) => ({
        place_id: place.id,
        formatted_address: place.formattedAddress,
        name: place.displayName?.text,
        geometry: place.location ? {
          location: {
            lat: place.location.latitude,
            lng: place.location.longitude
          }
        } : undefined,
        photos: place.photos?.map((photo: any) => ({
          photo_reference: photo.name.split('/').pop(), // Extract photo reference from name
          height: photo.heightPx,
          width: photo.widthPx
        }))
      })) || [],
      status: 'OK'
    };
    
    console.log('New Places API response:', JSON.stringify(transformedResponse, null, 2));
    
    // Forward the transformed response back to the frontend
    res.json(transformedResponse);
  } catch (error: any) {
    console.error('Error calling New Google Places API:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch data from Google Places API',
      details: error.response?.data || error.message
    });
  }
});

// Proxy endpoint for Google Photos - serves images directly without exposing API key
app.get('/api/google-photo/:photoReference', async (req: Request, res: Response) => {
  const { photoReference } = req.params;
  const { maxwidth = '400' } = req.query;

  if (!photoReference) {
    return res.status(400).json({ error: 'Photo reference is required' });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is not configured on the server' });
  }

  // Construct the Google Photos API URL
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${photoReference}&key=${apiKey}`;

  try {
    // Fetch the image from Google
    const response = await axios.get(photoUrl, {
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'http://localhost:5173' // Add referer header to match your API key restrictions
      }
    });

    // Set appropriate headers for image response
    const contentType = response.headers['content-type'] || 'image/jpeg';
    const contentLength = response.headers['content-length'];
    
    res.setHeader('Content-Type', contentType);
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }
    
    // Add caching headers to improve performance
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.setHeader('ETag', `"${photoReference}-${maxwidth}"`);
    
    // Stream the image data directly to the client
    response.data.pipe(res);
    
    response.data.on('error', (error: any) => {
      console.error('Error streaming photo:', error);
      if (!res.headersSent) {
        // Return a redirect to a placeholder image instead of an error
        res.redirect('/api/placeholder-image');
      }
    });

  } catch (error: any) {
    console.error('Error fetching photo from Google:', error.response?.data || error.message);
    
    // Instead of returning JSON error (which causes ORB), redirect to placeholder
    res.redirect('/api/placeholder-image');
  }
});

// Endpoint to serve a random Jharkhand placeholder image
app.get('/api/placeholder-image', (req: Request, res: Response) => {
  // Array of available Jharkhand images
  const jharkhandImages = [
    'Baidyanath Dham.jpg',
    'Betla National Park.jpg',
    'dassam falls.jpg',
    'hundru.jpg',
    'Jagannath Temple.jpg',
    'jharkhandIntro.jpeg',
    'Jonha Falls.jpg',
    'Netarhat Jharkhand.jpg',
    'Parasnath Hill.jpg',
    'Patratu.jpg'
  ];
  
  // Select a random image
  const randomImage = jharkhandImages[Math.floor(Math.random() * jharkhandImages.length)];
  const imagePath = `http://localhost:5173/${randomImage}`;
  
  // Redirect to the frontend static image
  res.redirect(imagePath);
});



app.listen(5000, () => {
    console.log("✅ Server running on http://localhost:5000");
});