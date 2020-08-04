const jwt = require("jsonwebtoken");
const { getUserByemail } = require("../repositries/user");
const SECRET_KEY = "JWT_SECRET";

module.exports = async function (req, res, next) {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) return res.status(401).send({
        message: "access denied no token provided."
    });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await getUserByemail(decoded.email);
        if (user && (user.password == decoded.password)) {
            req.user = decoded;
            next();
        }
        else {
            return res.status(401).send({
                message: "unauthorized_access"
            });
        }
    } catch (ex) {
        //if invalid token
        res.status(400).send({ message: "invalid_token." });
    }
};

