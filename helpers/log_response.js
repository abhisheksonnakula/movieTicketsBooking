const { Log } = require("../db/models/Logs")

exports.logResposne = async (req, data) => {
    await Log.findByIdAndUpdate(req.log_id, { res_obj: JSON.stringify(data) });
};