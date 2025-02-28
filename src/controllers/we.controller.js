const path = require("path");
const cloudinary = require("../config/cloudinary.js");
const UserDocumentModel = require("../models/user.visa.document.model.js");
const UserMedicalReportModel = require("../models/user.medical.report.model.js");
const AvailableVisaModel = require("../models/availableVisa.model.js");

exports.CreateVisa = async (req, res) => {
    const {passport_number} = req.body;
    const visa_image = req.file;

    if (!passport_number || !visa_image) {
        return res.status(400).json({
            status: "fail",
            message: "Passport number and image are required",
        });
    }

    const mimeType = visa_image.mimetype.split("/")[1];
    const filename = visa_image.filename;
    const filePath = path.resolve(__dirname, "../uploads", filename);

    const uploadResult = await cloudinary.uploader
        .upload(filePath, {
            filename_override: filename,
            folder: "visa_images",
            format: mimeType,
        })
        .catch((error) => {
            console.log(error);
        });

    try {
        const userDocument = await UserDocumentModel.create({
            passport_number,
            visa_image: uploadResult.secure_url,
        });

        res.json({
            status: "success",
            message: "Visa information saved successfully",
            data: {
                passport_number: userDocument?.passport_number,
                visa_image: userDocument?.visa_image,
            },
        });
    } catch (error) {
        console.error("Error processing visa information:", error);
        res
            .status(500)
            .json({status: "fail", message: "Error processing visa information"});
    }
};

exports.CreateMedicalReport = async (req, res) => {
    const {passport_number} = req.body;
    const medical_image = req.file;

    if (!passport_number || !medical_image) {
        return res.status(400).json({
            status: "fail",
            message: "Visa number and medical image are required",
        });
    }

    const mimeType = medical_image.mimetype.split("/")[1];
    const filename = medical_image.filename;
    const filePath = path.resolve(__dirname, "../uploads", filename);

    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: filename,
            folder: "medical_images",
            format: mimeType,
        });

        const userMedicalReport = await UserMedicalReportModel.create({
            passport_number,
            medical_image: uploadResult.secure_url,
        });

        res.json({
            status: "success",
            message: "Medical report saved successfully",
            data: {
                passport_number: userMedicalReport?.passport_number,
                medical_image: userMedicalReport?.medical_image,
            },
        });
    } catch (error) {
        console.error("Error processing medical report:", error);
        res
            .status(500)
            .json({status: "fail", message: "Error processing medical report"});
    }
};

exports.GetAvailableVisa = async (req, res) => {
    try {
        const results = await AvailableVisaModel.find().sort({createdAt: -1});
        let data = {
            message: "Visa  retrieved successfully",
            results,
        };
        return res.status(200).json({ status: "success", data });
    } catch (err) {
        console.log(err);
    }
}

exports.CreateAvailableVisa = async (req, res) => {
    const {title, country, description, is_publish} = req.body;
    const iconFile = req.file;
    let uploadResult;


    if (!title || !country || !description) {
        return res.status(400).json({
            status: "fail",
            message: "Missing required fields",
        });
    }

    if(iconFile){
        const mimeType = iconFile.mimetype.split("/")[1];
        const filename = iconFile.filename;
        const filePath = path.resolve(__dirname, "../uploads", filename);

        uploadResult = await cloudinary.uploader
            .upload(filePath, {
                filename_override: filename,
                folder: "available_visa",
                format: mimeType,
            })
            .catch((error) => {
                console.log(error);
            });
    }

    try {
        const data = await AvailableVisaModel.create({
            title,
            country,
            description,
            is_publish,
            icon: uploadResult?.secure_url || null
        });

        res.json({
            status: "success",
            message: "Available visa edited successfully",
            data,
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: "fail", message: "Error "});
    }
};

exports.UpdateAvailableVisa = async (req, res)=> {
    const {is_publish} = req.body;
    const {id} = req.params;

    // Find actual project
    let matchData;
    try {
        matchData = await AvailableVisaModel.findOne({_id: id})
    } catch (e) {
        res.status(404).json({
            message: "Error while finding visa",
        })
    }

    if(matchData){
        try {
            const data = await AvailableVisaModel.findOneAndUpdate({_id: id},{
                is_publish,
            });

            res.json({
                status: "success",
                message: "Available visa update successfully",
            });
        } catch (error) {
            console.log(error.message)
            res.status(500).json({status: "fail", message: "Error "});
        }
    }else{
        return res.status(404).json({
            message: "Visa not found",
        })
    }


}
