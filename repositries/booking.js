const { Booking } = require("../db/models/Bookings")

exports.creatBooking = async (data) => {
    let booking_data = await Booking.create(data);
    return booking_data;
}

exports.updateBookingStatus = async (booking_id, status) => {
    let updated_booking = await Booking.findByIdAndUpdate(booking_id, { status }, { new: true });
    return updated_booking;
}