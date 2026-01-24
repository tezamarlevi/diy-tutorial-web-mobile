import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import productRoute from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true 
}));

app.use(express.json());
app.use(ratelimiter);

// Routes
app.use("/api/product", productRoute);
app.use("/api/auth", authRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
});
