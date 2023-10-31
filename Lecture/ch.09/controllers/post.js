exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({ url : `/img/${req.file.filename}`});
};

exports.uploadPost = async (req, res, next) => {
    try {

    } catch (error) {
        console.error(error);
        next(error);
    }
};