const { User } = require("../db/models/Users");
const { createUser, getUserByemail } = require("../repositries/user");

exports.register = async (req, res) => {
    try {
        let user = await getUserByemail(req.body.email);
        if (user) return res.status(400).send({
            message: "User already registered."
        });
        let registered_user = await createUser(req.body);
        return res.status(200).send(registered_user);
    } catch (e) {
        console.log("[controller:regsiter:exception]", e);
        return res.status(400).send(e);
    }
};