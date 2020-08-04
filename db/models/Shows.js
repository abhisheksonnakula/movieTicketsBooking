const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
    show_name: {
        type: String,
        default: "",
    },
    date_time: {
        type: Date,
    },
    no_of_seats_available: {
        type: Number,
        default: 0
    },
    theatre_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatre',
    },
    movie_name: {
        type: String,
        default: "",
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
    },
    // To create Seat Records.
    screen_name: {
        type: String,
        default: '',
    }
}, { timestamps: true },
);
// Terminates for duplicate entry.
ShowSchema.index({ 'theatre_id': 1, 'movie_id': 1, 'date_time': 1 }, { unique: true });
const Show = mongoose.model('Show', ShowSchema);
exports.Show = Show;
