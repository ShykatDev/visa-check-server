const ComplainModel = require("../models/complains.model.js");
const cloudinary = require("../config/cloudinary.js");
const path = require("path");
const sendMail = require("../utils/mailSend.js");

exports.CreateComplain = async (req, res) => {
    const {
        passport_number,
        phone_number,
        body,
        present_address,
        first_name,
        last_name,
        subject,
        country,
    } = req.body;

    const complain_img = req.file;
    let uploadResult;

    //   Checking for empty values
    if (
        !passport_number ||
        !phone_number ||
        !body ||
        !present_address ||
        !first_name ||
        !last_name ||
        !subject ||
        !country
    ) {
        return res.status(400).json({
            status: "failed",
            message: "Missing required fields",
        });
    }

    if (complain_img) {
        const mimeType = complain_img.mimetype.split("/")[1];
        const filename = complain_img.filename;
        const filePath = path.resolve(__dirname, "../uploads", filename);

        uploadResult = await cloudinary.uploader
            .upload(filePath, {
                filename_override: filename,
                folder: "complain_img",
                format: mimeType,
            })
            .catch((error) => {
                console.log(error);
            });
    }

    try {
        await ComplainModel.create({
            passport_number,
            phone_number,
            body,
            present_address,
            first_name,
            last_name,
            subject,
            country,
            complain_img: uploadResult?.secure_url || null,
        });
        const bodyHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
    <h3 style="font-weight: bold">Subject: ${subject}</h3>
    <p>${body}</p>
    ${complain_img ? `<a href="${uploadResult?.secure_url}">Complain Image</a>` : ''}
    
    <hr>
    <h3 style="text-align: center; color: #4CAF50;">Applicant Details</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Full Name</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${first_name} ${
            last_name
        }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Phone Number</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
            phone_number
        }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Passport Number</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
            passport_number
        }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Present Address</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${present_address}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Country</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${country}</td>
      </tr>
    </table>
  </div>
`;

        await sendMail("saikatsam347@gmail.com", "Application Response", bodyHtml);
        return res.status(201).json({status: "success"});
    } catch (err) {
        return res.status(500).json({status: "fail", data: err.toString()});
    }
};

exports.GetComplain = async (req, res) => {
    try {
        const results = await ComplainModel.find();

        let data = {
            message: "Complains retrieved successfully",
            results,
        };

        return res.status(200).json({status: "success", data});
    } catch (err) {
        console.log(err);
    }
};
