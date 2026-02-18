import Resume from '../models/resumeModel.js';
import resumeModel from '../models/resumeModel.js'

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

} catch (error) {
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
    } catch (error) {
        res.status(500).json({ message: "Failed to get resumes", error: error.message });
    }
 }

 //Get resume by id
  export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({_Id: req.params.id, userID: req.user._id})
        if(!resume){
            return res.status(400).json({ message: "Resume not found"});
        }
        res.json(resume)
    } catch (error) {
        res.status(500).json({ message: "Failed to get resumes", error: error.message });
    }
 }
