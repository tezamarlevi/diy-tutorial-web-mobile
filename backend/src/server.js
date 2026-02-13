import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import tutorialRoutes from "./routes/tutorialRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Updated CORS Configuration
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://heritageecommerce.netlify.app",
    "https://diy-tutorial-web-mobile.onrender.com"
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


// Routes
app.use("/api/tutorials", tutorialRoutes);
app.use("/api/auth", authRoutes);

connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log("Server started on PORT:", PORT);
    });
});
