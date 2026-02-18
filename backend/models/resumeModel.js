import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    template: {
        theme: String,
        colorPalette: String
    },
    profileInfo: {
        profilePreviewUrl: String,
        fullName: String,
        designation: String,
        summary: String,
    },
    thumbnailLink: {
        type: String,
    },
    contactInfo: {
        email: String,
        phone: String,
        linkedin: String,
        github: String,
        location: String,
        website: String
    },
    
    education: [
        {
            institution: String,
            degree: String,
            startDate: String,
            endDate: String,
        },
    ],

    workExperience: [
        {
            company: String,
            role: String,
            startDate: String,
            endDate: String,
            description: String
        },
    ],

    skills: [
        {
            name: String, 
            progress: Number
        },
    ],
    projects: [
        {
            title: String,
            description: String,
            github: String,
            liveDemo: String
        },
    ],
    certifications: [
        {
            title: String,
            issuer: String,
            year: String,
        },
    ],
    languages: [
        {
            name: String, 
            progress: Number
        },
    ],
    interests: [String],
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;