const UserToken = require("../models/userTolenModel");

exports.authorized = (req, res, next) => {
    const userToken = req.headers["x-access-token"];
    if (userToken) {
        const isToken = UserToken.getUserToken(userToken);
        if (isToken) {
            return next();
        }
    } else {
        return res.status(401).json({ message: "Unauthorized" })
    }
}
exports.authorized = (req, res, next) => {
    const userToken = req.headers["x-access-token"];
    if (userToken) {
        const isToken = UserToken.getUserToken(userToken);
        if (isToken) {
            return next();
        }
    } else {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

exports.notFound = (req, res, next) => {
    return res.status(404).json({ message: "Route not found" })
}