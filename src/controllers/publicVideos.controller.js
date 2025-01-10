const PublicVideosModel = require('../models/public_videos.model.js');

exports.AddVideos = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send({
            message: "URLs must be provided.",
        });
    }

    try {
        const findVideo = await PublicVideosModel.findOne({ url });

        if (findVideo) {
            return res.status(400).send({
                message: "Video already exists",
            })
        }

        // Create a new document if not found
        await PublicVideosModel.create({
            url,
        });

        return res.status(201).send({
                message: "New video entry created.",
        });


    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
};

exports.GetVideos = async (req, res) => {
    try{
        const data = await PublicVideosModel.find().sort({createdAt: -1});
        return res.status(200).send({
            message: "Videos found.",
            data
        })
    }catch(err){
        return res.status(500).send({
            message: err.message,
        })
    }
}

exports.DeleteVideo = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedVideo = await PublicVideosModel.findByIdAndDelete(id); // Pass the ID directly

        if (!deletedVideo) {
            return res.status(404).send({
                message: "Video not found.",
            });
        }

        return res.status(200).send({
            message: "Video deleted successfully.",
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
};
