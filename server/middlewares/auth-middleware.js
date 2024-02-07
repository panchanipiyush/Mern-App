const jwt = require("jsonwebtoken");
const User = require("../models/user-model")
const authMiddleware = async (req, res, next) => {
   
    const token = req.header("Authorization")

    if (!token) {
        return res.status(401).json({ message: "Unauthorized HTTP, Token not provider" });
    }
    const jwttoken = token.replace("Bearer", "").trim();
    try {

        const isVerfied = await jwt.verify(jwttoken, process.env.JWT_KEY);
        // console.log("isVerfied :",isVerfied);

        const userData = await User.findOne({ email: isVerfied.email }).select({ password: 0, });

        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token" })
    }

}

module.exports = authMiddleware;