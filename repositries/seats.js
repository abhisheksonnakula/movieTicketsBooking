const { Seat } = require("../db/models/Seats")

exports.createSeats = async (body) => {
    let created_seats = await Seat.create(body);
    return created_seats;
};

exports.getAvailableSeats = async (show_id) => {
    let available_seats = await Seat.find({ show_id, status: false }).select("-show_id -status -__v -createdAt -updatedAt");
    return available_seats;
};

exports.getIndividualSeatAvailability = async (_id) => {
    let seat_availability = await Seat.findOne({ _id, status: false });
    return seat_availability;
}

exports.bookSeat = async (_id) => {
    let seat_booking_status = await Seat.findOneAndUpdate({ _id, status: false }, { status: true }, { new: true });
    return seat_booking_status;
};

exports.releaseSeat = async (_id) => {
    let status = await Seat.findOneAndUpdate({ _id, status: true }, { status: false }, { new: true });
    return status;
}

exports.getSeat = async (_id) => {
    let seat_details = await Seat.findById(_id);
    return seat_details;
}
