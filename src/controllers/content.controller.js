const HeadingModel = require('../models/heading.model.js')

exports.GetHeading = async (req, res)=> {
    try {
        const results = await HeadingModel.findOne();

        let data = {
            message: "Heading retrieved successfully",
            results,
        };

        return res.status(200).json({ status: "success", data });
    } catch (err) {
        console.log(err);
    }
}

exports.CreateHeading = async (req, res)=> {
    const {heading} = req.body;

    //   Checking for empty values
    if (!heading) {
        return res.status(403).json({
            status: "fail",
            message: "Missing required fields",
        });
    }

    try {
        await HeadingModel.create({
            heading
        });
        return res.status(201).json({ status: "success" });
    } catch (err) {
        return res.status(500).json({ status: "fail", data: err.toString() });
    }
}

exports.EditHeading = async (req, res)=> {
    const {heading} = req.body;
    const {id} = req.params;

    // Find actual project
    let matchData;
    try {
        matchData = await HeadingModel.findOne({_id: id})
    } catch (e) {
        res.status(404).json({
            message: "Error while finding heading",
        })
    }

    if (matchData) {
        try {
            await HeadingModel.findOneAndUpdate({_id: id}, {
                heading
            })
            res.status(200).json({
                message: "Heading edited successfully",
            })
        } catch (err) {
            res.status(500).json({
                message: err.message.toString()
            })
        }
    } else {
        return res.status(404).json({
            message: "Heading not found",
        })
    }

}