const { storeShow, getShow } = require("../repositries/show");
const { addShowsToTheatre } = require("../repositries/theatre");
const { createSeats, getAvailableSeats } = require("../repositries/seats");
const { seats_array } = require("../constans/constants");

exports.createShow = async (req, res) => {
    try {
        const stored_show = await storeShow(req.body);
        if (stored_show) {
            // Adding Show_Id to the Theater shows
            const show_obj = {
                show_id: stored_show._id,
                date_time: stored_show.date_time,
            }
            const add_shows_to_theater = await addShowsToTheatre(req.body.theatre_id, show_obj);
            // Plan of creating seats records using classes specific to screen name and theater name.
            // Temporary Solution creating static seats objects. 
            let seats_to_be_created = await seats_array(stored_show._id);
            const seats = await createSeats(seats_to_be_created);
        }
        res.status(200).send(stored_show);
    } catch (error) {
        console.log("[controller:createShow:exception]", error);
        res.status(400).send(error);
    }
}

exports.getShow = async (req, res) => {
    try {
        const show_id = req.params.id;
        let show_details = await getShow(show_id);
        console.log(show_details);
        const seats_array = await getAvailableSeats(show_id);
        show_details.no_of_seats_available = seats_array.length;
        show_details = { seats_available: seats_array, show_details };
        res.status(200).send(show_details);
    } catch (error) {
        console.log("[controller:getShow:exception]", error);
        res.status(400).send(error);
    }
}