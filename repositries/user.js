const { User } = require("../db/models/Users");
exports.getUserByemail = async (email) => {
    const fetched_user = await User.findOne({ email });
    return fetched_user;
}

exports.createUser = async (body) => {
    const stored_user = await User.create(body);
    return stored_user;
}