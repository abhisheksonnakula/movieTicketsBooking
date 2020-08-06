const { bookSeat, releaseSeat, getSeat } = require("../repositries/seats");
const { creatBooking, getBookingDetails, updateBookingStatus } = require('../repositries/booking');
const { Booking } = require("../db/models/Bookings");
const { logResposne } = require("../helpers/log_response");

exports.makeBooking = async (req, res) => {
    try {
        let selected_seats = req.body.selected_seats;
        let booked_seats = [];
        // Checking seats availability and booking seats
        for (i = 0; i < selected_seats.length; i++) {
            // checking if any of the seats is not available at the time of transaction.
            let seat_booked = await (bookSeat(selected_seats[i]));
            if (!seat_booked) {
                if (booked_seats.length > 0) {
                    booked_seats.forEach(async (element) => {
                        await releaseSeat(element);
                    });
                };
                logResposne(req, { error: `Sorry the seats you are trying to book is unavailable` })
                return res.status(400).send({ error: `Sorry the seats you are trying to book is unavailable` });
            };
            booked_seats.push(selected_seats[i]);
        };
        let booking_obj = {
            user_id: req.user._id,
            show_id: req.body.show_id,
            status: req.body.booking_status,
            seats_booked: [],
        };
        for (i = 0; i < booked_seats.length; i++) {
            let seat_details = await getSeat(booked_seats[i]);
            let temp_obj = {
                seat_row: seat_details.seat_row,
                seat_number: seat_details.seat_number,
                seat_id: seat_details._id
            };
            booking_obj.seats_booked.push(temp_obj);
        };
        let booking_record = await creatBooking(booking_obj);
        // Relase The Tickets after someTime if paymentisn't succesfully ....
        releaseSeats(booking_record._id);
        logResposne(req, booking_record);
        res.status(200).send(booking_record);



    } catch (error) {
        console.log("[controller.booking:exception]", error);
        logResposne(req, error);
        res.status(400).send(error);
    }
};

exports.updateBooking = async (req, res) => {
    try {
        let booking_detials = await getBookingDetails(req.body.booking_id);
        if (booking_detials.status != 'payment_success') {

            if (booking_detials.status == 'tickets_released') {
                // Retrying booking since seats are released
                if (req.body.booking_status == 'payment_success' || req.body.booking_status == 'payment_pending' || req.body.booking_status == "tickets_selected") {
                    let selected_seats = booking_detials.seats_booked;
                    let booked_seats;
                    // Checking seats availability and booking seats
                    for (i = 0; i < selected_seats.length; i++) {
                        // checking if any of the seats is not available at the time of transaction.
                        let seat_booked = await (bookSeat(selected_seats[i]));
                        if (!seat_booked) {
                            if (booked_seats.length > 0) {
                                booked_seats.forEach(async (element) => {
                                    await releaseSeat(element);
                                });
                            };
                            logResposne(req, { error: `Sorry the seats you are trying to book is unavailable` })
                            await updateBookingStatus(req.body.booking_id, { status: "booking_cancelled" })
                            return res.status(400).send({ error: `Sorry the seats you are trying to book is unavailable` });
                        };
                        booked_seats.push(selected_seats[i]);
                    };
                }
                // Relase The Tickets after someTime if paymentisn't succesfully ....
                releaseSeats(booking_detials._id);
            }
            if (req.body.booking_status == 'payment_pending') {
                releaseSeats(booking_detials._id);
            }
            if (req.body.booking_status == 'payment_failed' || req.body.booking_status == 'booking_cancelled') {
                let booked_seats = booking_detials.seats_booked;
                booked_seats.forEach(element => {
                    releaseSeat(element.seat_id);
                });
            }
            let updated_booking_record = await updateBookingStatus(req.body.booking_id, { status: req.body.booking_status });
            logResposne(req, updated_booking_record);
            res.status(200).send(updated_booking_record);
        }
        // Payment Succes and now want to cancel Booking => release tickets and send for refund if applicable
    } catch (error) {
        console.log("controller.booking.updateBooking:Exception", error);
        res.send(error);
    }
}


async function releaseSeats(_id) {
    // This Function will be called after 5 minutes
    setTimeout(async () => {
        let booking_record = await Booking.findById(_id);
        let seats_booked = booking_record.seats_booked
        if (booking_record.status != 'payment_success') {
            seats_booked.forEach((element, index) => {
                releaseSeat(element.seat_id);
            });
            // IF BOOKING STATUS IS PAYMENT_PENDING THEN INITIATE REFUND AFTER PAYMENT_SUCCESFUL AND MARK STATUS AS CANCELLED
        }
        await updateBookingStatus(_id, { status: "tickets_released" });
    }, (5 * 60000));
}
