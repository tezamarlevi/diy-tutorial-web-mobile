import Tutorial from "../models/Tutorial.js";

export async function getAllTutorials(req, res) {
    try {
        const tutorials = await Tutorial.find()
            .populate("createdBy", "name")
            .sort({ createdAt: -1 });
        res.status(200).json(tutorials);
    } catch (error) {
        console.error("Error in getAllTutorials controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getTutorialById(req, res) {
    try {
        const tutorial = await Tutorial.findById(req.params.id)
            .populate("createdBy", "name");
        if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });
        res.json(tutorial);
    } catch (error) {
        console.error("Error in getTutorialById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createTutorial(req, res) {
    try {
        const { title, description, content, videoUrl, duration, category, level, image } = req.body;
        const tutorial = new Tutorial({
            title,
            description,
            content,
            videoUrl,
            duration,
            category,
            level,
            image,
            createdBy: req.user.id,
        });

        await tutorial.save();

        // Populate createdBy before returning
        await tutorial.populate("createdBy", "name");

        res.status(201).json({ message: "Tutorial created successfully!", tutorial });
    } catch (error) {
        console.error("Error in createTutorial controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateTutorial(req, res) {
    try {
        const tutorial = await Tutorial.findById(req.params.id);
        if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });

        // Check ownership
        if (tutorial.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only edit your own tutorials" });
        }

        const { title, description, content, videoUrl, duration, category, level, image } = req.body;
        const updatedTutorial = await Tutorial.findByIdAndUpdate(
            req.params.id,
            { title, description, content, videoUrl, duration, category, level, image },
            { new: true }
        ).populate("createdBy", "name");

        res.status(200).json({ message: "Tutorial updated successfully!", tutorial: updatedTutorial });
    } catch (error) {
        console.error("Error in updateTutorial controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteTutorial(req, res) {
    try {
        const tutorial = await Tutorial.findById(req.params.id);
        if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });

        // Check ownership
        if (tutorial.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only delete your own tutorials" });
        }

        await Tutorial.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Tutorial deleted successfully!" });
    } catch (error) {
        console.error("Error in deleteTutorial controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
