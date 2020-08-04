const { Theatre } = require("../db/models/Theatres");

exports.createTheatre = async (body) => {
    const stored_theatre = await Theatre.create(body);
    return stored_theatre;
};

exports.addShowsToTheatre = async (_id, shows) => {
    const updated_theater = await Theatre.findByIdAndUpdate(
        _id,
        { $push: { shows: { show_id: shows.show_id, date_time: shows.date_time } } },
        { new: true },
    );
    return updated_theater;
}

