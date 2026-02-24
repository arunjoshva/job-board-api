import Application from "../models/Application.js";
import Job from "../models/Job.js";

// 1️⃣ Apply to Job
export const applyToJob = async (req,res) => {
    try {
        const {coverLetter} = req.body;
        const jobId = req.params.jobId;

        // Check if job exists
        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job Not Found"
            });
        }

        // Prevent duplicate applications
        const alreadyApplied = await Application.findOne({
            job:jobId,
            applicant:req.user._id
        });

        if(alreadyApplied){
            return res.status(400).json({
                success:false,
                message:"You have already applied to this Job"
            });
        }

        // Create application
        const application = await Application.create({
            job:jobId,
            applicant:req.user._id,
            coverLetter:coverLetter           
        });

        res.status(201).json({
            success:true,
            message:"Job Applied Successfully",            
            data:application
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });
    }
}

// 2️⃣ View My Applications
export const getMyApplications = async (req,res) => {
    try {
        const applications = await Application.find({
            applicant:req.user._id
        }).populate("job", "title company location salary");

        res.status(200).json({
            success:true,
            count:applications.length,
            data:applications
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });
    }
}

// 3️⃣ View Applications For Specific Job (Employer)
export const getApplicationsForJob = async (req,res) => {
    try {
        const jobId = req.params.jobId;

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job Not Found"
            });
        }

        // 3️⃣ View Applications For Specific Job (Employer)
        if(job.postedBy.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success:false,
                message:"Not Authorized to view this Job Applications"
            });
        }

        const applications = await Application.find({job:jobId}).populate("applicant", "name email");

        res.status(200).json({
            success:true,
            message:"Job Applications",
            count:applications.length,
            data:applications
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}


