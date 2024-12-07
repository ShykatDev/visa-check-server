const OutPassModel = require("../models/outpass.mdoel.js");
const sendMail = require("../utils/mailSend.js");

exports.CreateOutPass = async (req, res) => {
    const {
        first_name,
        last_name,
        passport_number,
        phone_number,
        present_address,
        country,
    } = req.body;

    //   Checking for empty values
    if (
        !passport_number ||
        !phone_number ||
        !present_address ||
        !first_name ||
        !last_name ||
        !country
    ) {
        return res.status(400).json({
            status: "failed",
            message: "Missing required fields",
        });
    }

    try {
        await OutPassModel.create({
            first_name,
            last_name,
            passport_number,
            phone_number,
            present_address,
            country,
        });
        const bodyHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
    <h3 style="text-align: center; color: #4CAF50;">Life Security Application</h3>
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
      <tr>
    </table>
  </div>
`;
        await sendMail("saikatsam347@gmail.com", "Outpass Response", bodyHtml);
        return res.status(201).json({ status: "success" });
    } catch (err) {
        return res.status(500).json({ status: "fail", data: err.toString() });
    }
};

exports.GetOutPass = async (req, res) => {
    try {
        const results = await OutPassModel.find();

        let data = {
            message: "Outpass retrieved successfully",
            results,
        };

        return res.status(200).json({ status: "success", data });
    } catch (err) {
        console.log(err);
    }
};
