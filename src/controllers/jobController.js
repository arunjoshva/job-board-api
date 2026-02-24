import Job from "../models/Job.js";

// 1️⃣ Create Job
export const createJob = async (req,res) => {
    try {
        const {title, description, company, location, salary} = req.body;

        if(!title || !description || !company || !location || !salary){
            return res.status(400).json({
                success:false,
                message:"Please provide all required fields"
            });
        }

        const job = await Job.create({
            title:title,
            description:description,
            company:company,
            location:location,
            salary:salary,
            postedBy:req.user._id
        });

        res.status(201).json({
            success:true,
            message:"Job Created Successfully",
            data:job
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });
    }
}

// 2️⃣ Get All Jobs
export const getAllJobs = async (req,res) => {
    try {
        const jobs = await Job.find().populate("postedBy", "name email");

        res.status(200).json({
            success:true,
            message:"All Jobs Listed",
            count:jobs.length,
            data:jobs
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}

// 3️⃣ Get Single Job
export const getSingleJob = async (req,res) => {
    try {
        const job = await Job.findById(req.params.id).populate("postedBy", "name email");

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job Not Found"
            });
        }

        res.status(200).json({
            success:true,
            message:"Job Listed Successfully",
            data:job
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}

// 4️⃣ Update Job
export const updateJob = async (req,res) => {
    try {
        let job = await Job.findById(req.params.id);

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job Not Found"
            });
        }

         // Only job owner can update
         if(job.postedBy.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success:false,
                message:"Not Authorized to Update this Job"
            });
         }

         job = await Job.findByIdAndUpdate(req.params.id, req.body, {returnDocument:"after", runValidators:true});

         res.status(200).json({
            success:true,
            message:"Job Updated Successfully"
         });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });        
    }
}

// 5️⃣ Delete Job
export const deleteJob = async (req,res) => {
    try {
        const job = await Job.findById(req.params.id);

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job Not Found"
            });
        }

        // Only job owner can delete
        if(job.postedBy.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success:false,
                message:"Not Authorized to Delete this job"
            });
        }

        await job.deleteOne();

        res.status(200).json({
            success:true,
            message:"Job Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }   
}