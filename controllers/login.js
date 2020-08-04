const { getUserByemail } = require("../repositries/user");
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        let fetched_user = await getUserByemail(req.body.email);
        if (!fetched_user) return res.status(400).send({ error: `no records found with email :  ${req.body.email}` });
        if (fetched_user && bcrypt.compareSync(req.body.password, fetched_user.password)) {
            const token = fetched_user.generateAuthToken();
            res.status(200).send({
                token: token,
                _id: fetched_user._id,
                first_name: fetched_user.first_name,
                last_name: fetched_user.last_name,
                email: fetched_user.email,
            });
        }
        else {
            res.status(401).send({
                message: "incorrect credentials",
            });
        };
    } catch (error) {
        console.log("[controller:login:exception]".error);
        res.status(400).send({ error });
    }
}