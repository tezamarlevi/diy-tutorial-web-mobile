import mongoose from "mongoose";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1612367990403-73ef3e67bc4f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const tutorialSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: false,
            default: "",
        },
        duration: {
            type: Number, // in minutes
            required: true,
            min: 0,
        },
        category: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            enum: ["Beginner Friendly", "Intermediate", "Advanced Level"],
            default: "Beginner Friendly",
        },
        image: {
            type: String,
            required: false,
            default: DEFAULT_IMAGE,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Tutorial = mongoose.model("Tutorial", tutorialSchema);

export default Tutorial;
