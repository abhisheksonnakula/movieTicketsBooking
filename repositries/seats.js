const { Seat } = require("../db/models/Seats")

exports.createSeats = async (body) => {
    const created_seats = await Seat.create(body);
    return created_seats;
};

exports.getAvailableSeats = async (show_id) => {
    const available_seats = await Seat.find({ show_id, status: false }).select("-_id -show_id -status -__v -createdAt -updatedAt");
    return available_seats;
}