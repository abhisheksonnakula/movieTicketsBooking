const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    show_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
    },
    seats_booked: [
        {
            seat_row: {
                type: String
            },
            seat_number: {
                type: Number
            },
            seat_id: {
                type: String
            }
        }
    ],
    status: {
        type: String,
        enum: [
            'tickets_selected',
            'tickets_booked',
            'payment_successful',
            'payment_pending',
            'payment_failed'
        ],
    },
}, { timestamps: true }
);

const Booking = mongoose.model('Booking', BookingSchema);
exports.Booking = Booking;