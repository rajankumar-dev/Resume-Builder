import Resume from '../models/resumeModel.js';
import {path} from 'fs'

//Create Resume
// DATA FOR CREATEREMUNE CONTROLLER
export const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        // Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };

        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
            ...req.body
        })
        res.status(201).json(newResume)

} 
catch (error) {
    res.status(500).json({ message: "Failed to create resume", error: error.message });
}
}

//Get Func
 export const getUserResumes = async (req, res) => {
    try {
        const resume = await Resume.find({userId: req.user._id}).sort({
            updatedAt: -1
        });
        res.json(resume)
    } 
    catch (error) {
        res.status(500).json({ message: "Failed to get resumes", error: error.message });
    }
 }

 //Get resume by id
  export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({_Id: req.params.id, userId: req.user._id})
        if(!resume){
            return res.status(404).json({ message: "Resume not found"});
        }
        res.json(resume)
    } 
    catch (error) {
        res.status(500).json({ message: "Failed to get resumes", error: error.message });
    }
 }

 //update resume
 export const updataResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({_Id: req.params.id, userId: req.user._id})

        if(!resume){
            return res.status(404).json({ message: "Resume not found or not authorized"});
        }
        //Merg updated resume
        Object.assign(resume, req.body)
        //Save updatad resume
        const savedResume = await resume.save();
        res.json(savedResume)
    } 
    catch (error) {
        res.status(500).json({ message: "Failed to update resumes", error: error.message });
    }
 }

 // Delete function
 export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({_Id: req.params.id, userId: req.user._id})
        if(!resume){
            return res.status(404).json({ message: "Resume not found or not authorized"});
        }

        //Create a uploads folder and store the resume there
        const uploadsFolder = path.join(process.cwd(), 'uploads')

        //Delete Thumbnail func
        if(resume.thumbnailLink){
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink))
            if(fs.existsSync(oldThumbnail)){
                fs.unlinkSync(oldThumbnail)
            }
        }
        if(resume.profileInfo && resume.profileInfo.profileImg){
            const oldProfileImg = path.join(uploadsFolder, path.basename(resume.profileInfo.profileImg))
            if(fs.existsSync(oldProfileImg)){
                fs.unlinkSync(oldProfileImg)
            }
        }

        //Delete resume
        const deleted = await Resume.findByIdAndDelete({
            _id: req.params.id,
            userId: req.user._id
        })
        if(!deleted){
            return res.status(404).json({ message: "Resume not found or not authorized"});
        }
        res.json({ message: "Resume deleted successfully"})
    } 
    catch (error) {
        res.status(500).json({ message: "Failed to delete resume", error: error.message });
    }
 }