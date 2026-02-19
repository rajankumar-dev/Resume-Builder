import express from "express";
const resumeRouter = express.Router();
import { createResume, getUserResumes, getResumeById, updataResume, deleteResume } from './../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';

resumeRouter.post('/', protect, createResume);
resumeRouter.get('/', protect, getUserResumes);
resumeRouter.get('/:id', protect, getResumeById);
resumeRouter.put('/:id', protect, updataResume);
resumeRouter.delete('/:id', protect, deleteResume);

export default resumeRouter;