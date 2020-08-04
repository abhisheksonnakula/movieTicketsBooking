const { createTheatre } = require("../repositries/theatre");

exports.theatre = async (req, res) => {
    try {
        const stored_theatre = await createTheatre(req.body);
        res.status(200).send(stored_theatre);
    } catch (error) {
        res.status(400).send(error);
    }
}