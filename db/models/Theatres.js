const mongoose = require('mongoose');

const TheatreSchema = new mongoose.Schema({

    theatre_name: {
        type: String,
        maxlength: 50,
        default: ""
    },
    theatre_location: {
        type: String,
        maxlength: 50,
        default: "",
    },
    shows: [
        {
            show_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Show',
            },
            date_time: {
                type: Date,
            }
        }
    ],
},
    { timestamps: true },
);

const Theatre = mongoose.model('Theatre', TheatreSchema);
exports.Theatre = Theatre;