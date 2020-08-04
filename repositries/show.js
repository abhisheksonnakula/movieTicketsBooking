const { Show } = require("../db/models/Shows")

exports.storeShow = async (body) => {
    const stored_show = await Show.create(body);
    return stored_show;
}

exports.getShow = async (show_id) => {
    const show_detals = await Show.findById(show_id).select("-_id  -__v -createdAt -updatedAt");
    return show_detals;
}