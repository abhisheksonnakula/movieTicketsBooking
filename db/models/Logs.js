const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    path: {
        type: String,
    },
    req_obj: {
        type: String
    },
    res_obj: {
        type: String,
    },
}, { timestamps: true }
);

const Log = mongoose.model('Log', LogSchema);
exports.Log = Log;