const { bookSeat, releaseSeat, getSeat } = require("../repositries/seats");
const { creatBooking } = require('../repositries/booking');

exports.makeBooking = async (req, res) => {
    try {
        let selected_seats = req.body.selected_seats;
        let booked_seats = [];
        // Checking seats availability and booking seats
        selected_seats.forEach(element => {
            // checking if any of the seats is not available at the time of transaction.
            if (!bookSeat(element)) {
                if (booked_seats.length < 0) {
                    booked_seats.forEach(async (element) => {
                        await releaseSeat(element);
                    });
                }
                throw new Error(`Sorry the seats you are trying to book is unavailable`);
            }
            booked_seats.push(element);
        });
        // Create a booking record.
        let booking_obj = {
            user_id: req.user._id,
            shwo_id: req.body.show_id,
            status: req.body.booking_status,
        }
        booking_obj.seats_booked = [];
        booked_seats.forEach(async (element) => {
            let seat_details = await getSeat(element);
            booking_obj.seats_booked.push({
                seat_row: seat_details.seat_row,
                seat_number: seat_details.seat_number,
                seat_id: seat_details._id
            });
        });
        let booking_record = await creatBooking(booking_obj);
        res.status(200).send(booking_record);

    } catch (error) {
        console.log("[controllers.makeBooking:exception]", error);
        res.status(400).send(error);
    }
}