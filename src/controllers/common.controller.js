const path = require("path");
const cloudinary = require("../config/cloudinary.js");
const JobApplicationModel = require("../models/application.model.js");
const JobModel = require("../models/job.model.js");
const AvaiulableVisaModel = require("../models/availableVisa.model.js");
const LoanApplicationModel = require("../models/loanApplication.model.js");
const sendMail = require("../utils/mailSend.js");
const config = require("../utils/utils.js");

exports.ApplyJob = async (req, res) => {
  const {
    passport_number,
    phone_number,
    age,
    district,
    first_name,
    last_name,
  } = req.body;

  const { job_id, visa_id } = req.query;

  const profile_pic = req.file;

  //   Checking for empty values
  if (
    !profile_pic ||
    !passport_number ||
    !phone_number ||
    !age ||
    !district ||
    !first_name ||
    !last_name
  ) {
    return res.status(400).json({
      status: "failed",
      message: "Missing required fields",
    });
  }

  const mimeType = profile_pic.mimetype.split("/")[1];
  const filename = profile_pic.filename;
  const filePath = path.resolve(__dirname, "../uploads", filename);
  const uploadedResult = await cloudinary.uploader
    .upload(filePath, {
      filename_override: filename,
      folder: "Profile_Pic",
      format: mimeType,
    })
    .catch((error) => {
      console.log(error);
    });

  try {
    const body = {
      profile_pic: uploadedResult.secure_url,
      passport_number,
      phone_number,
      age,
      district,
      first_name,
      last_name,
      job_id,
      visa_id,
    };
    await JobApplicationModel.create(body);

    let appliedJob;
    let appliedVisa;

    if (job_id) {
      appliedJob = await JobModel.findOne({ _id: job_id });
    }

    if (visa_id) {
      appliedVisa = await AvaiulableVisaModel.findOne({ _id: visa_id });
    }

    // Convert body to a readable HTML format
    const bodyHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
    <h3 style="text-align: center; color: #4CAF50;">Application Response</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Full Name</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${body.first_name} ${
      body.last_name
    }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Phone Number</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
          body.phone_number
        }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Passport Number</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
          body.passport_number
        }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Age</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${body.age}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">District</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${body.district}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Applied Job</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
          appliedJob?.title || "N/A"
        }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Applied Visa</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
        appliedVisa?.country - appliedVisa?.title || "N/A"
        }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Profile Picture</td>
        <td style="padding: 8px; border: 1px solid #ddd;">
          <img src="${
            body.profile_pic
          }" alt="Profile Picture" width="100" height="100" style="border-radius: 5px;"/>
        </td>
      </tr>
    </table>
  </div>
`;

    await sendMail(config.mail_address, "Application Response", bodyHtml);

    return res.status(201).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({ status: "fail", data: err.toString() });
  }
};

exports.ApplyLoan = async (req, res) => {
  const {
    passport_number,
    phone_number,
    age,
    district,
    first_name,
    last_name,
    purpose,
    loan_amount,
    income
  } = req.body;

  const profile_pic = req.file;

  //   Checking for empty values
  if (
      !profile_pic ||
      !passport_number ||
      !phone_number ||
      !age ||
      !district ||
      !first_name ||
      !last_name ||
      !purpose ||
      !loan_amount ||
      !income
  ) {
    return res.status(400).json({
      status: "failed",
      message: "Missing required fields",
    });
  }

  const mimeType = profile_pic.mimetype.split("/")[1];
  const filename = profile_pic.filename;
  const filePath = path.resolve(__dirname, "../uploads", filename);
  const uploadedResult = await cloudinary.uploader
      .upload(filePath, {
        filename_override: filename,
        folder: "Profile_Pic",
        format: mimeType,
      })
      .catch((error) => {
        console.log(error);
      });

  try {
    const body = {
      profile_pic: uploadedResult.secure_url,
      passport_number,
      phone_number,
      age,
      district,
      first_name,
      last_name,
      purpose,
      loan_amount,
      income
    };
    await LoanApplicationModel.create(body);

    // Convert body to a readable HTML format
    const bodyHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
    <h3 style="text-align: center; color: #4CAF50;">Loan Application Response</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Full Name</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${body.first_name} ${
        body.last_name
    }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Phone Number</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
        body.phone_number
    }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Passport Number</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
        body.passport_number
    }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Age</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${body.age}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">District</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${body.district}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Purpose of loan</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
        body.purpose
    }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Loan Amount</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
        body.loan_amount
    }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Monthly Income</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${
        body.income
    }</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f4f4f4;">Profile Picture</td>
        <td style="padding: 8px; border: 1px solid #ddd;">
          <img src="${
        body.profile_pic
    }" alt="Profile Picture" width="100" height="100" style="border-radius: 5px;"/>
        </td>
      </tr>
    </table>
  </div>
`;

    await sendMail(config.mail_address, "Application Response", bodyHtml);

    return res.status(201).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({ status: "fail", data: err.toString() });
  }
};