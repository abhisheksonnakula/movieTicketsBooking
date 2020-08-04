const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
    show_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
    },
    seat_row: {
        type: String,
        default: '',
    },
    seat_number: {
        type: Number,
    },
    type: {
        type: String,
        default: "",
    },
    // SEAT AVAILABILITY STATUS
    status: {
        type: Boolean,
        default: false,
        // False - "SEAT_AVAILABLE"
        // True - "SEAT_BOOKED"
    },
    price: {
        type: Number,
        default: 0
    },
}, { timestamps: true },
);

const Seat = mongoose.model('Seat', SeatSchema);
exports.Seat = Seat;