import fs from 'fs';
import path from 'path';
import Resume from '../models/Resume';
import upload from '../middleware/uploadMiddleware';

// Upload Image
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.json({ imageUrl });
    } catch (error) {
        res.status(500).json({ message: "Failed to upload image", error: error.message });
    }
};

// Delete Image
export const deleteImage = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        if (!imageUrl) {
            return res.status(400).json({ message: "Image URL is required" });
        }
        const filename = path.basename(imageUrl);
        const filePath = path.join(process.cwd(), 'uploads', filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({ message: "Image deleted successfully" });
        } else {
            res.status(404).json({ message: "Image not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete image", error: error.message });
    }
};

// Get Image
export const getImage = async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(process.cwd(), 'uploads', filename);
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.status(404).json({ message: "Image not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to get image", error: error.message });
    }
};

// Get all images for a user
export const getUserImages = async (req, res) => {
    try {
        const userId = req.user._id;
        const resumes = await Resume.find({ userId }).select('thumbnailLink profileInfo.profileImg');
        const images = [];
        resumes.forEach(resume => {
            if (resume.thumbnailLink) {
                images.push(resume.thumbnailLink);
            }
            if (resume.profileInfo && resume.profileInfo.profileImg) {
                images.push(resume.profileInfo.profileImg);
            }
        });
        res.json({ images });
    } catch (error) {
        res.status(500).json({ message: "Failed to get user images", error: error.message });
    }
};
