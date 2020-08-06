const { Log } = require("../db/models/Logs")

module.exports = async (req, res, next) => {
    try {
        let log_obj = {
            req_obj: JSON.stringify(req.body),
            path: req.url,
            user_id: req.user._id
        }
        let log = await Log.create(log_obj, (err, succ) => {
            if (!err) {
                req.log_id = succ._id;
                next();
            }
        });
    } catch (error) {
        console.log("[log.js:exception]", error);
    }
}