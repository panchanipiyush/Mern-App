const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res.status(200).send("welcome home")
    } catch (error) {
        console.log(error);
    }
}
const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        // const userExist = await User.findOne({ email: email })
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "email alredy exist" })
        }
        const userCreated = await User.create({ username, email, phone, password })

        res.status(201).send({ msg: "registration successful", token: await userCreated.generateToken(), userId: userCreated._id.toString() })
    } catch (error) {
        // console.log(error);
        next(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        // const user = await bcrypt.compare(password, userExist.password)
        const user = await userExist.comparePassword(password)

        if (user) {
            res.status(200).send({ msg: "login successful", token: await userExist.generateToken(), userId: userExist._id.toString() })
        } else {
            res.status(401).json({ message: "Invalid email or password" })
        }

    } catch (error) {
        res.status(500).json("internal server error");
    }
}


// to send user data User Logic
const user = async (req, res) => {
    try {
        const userData = req.user;
        return res.status(200).json({ userData })
        // res.status(200).json({msg:"hi user"})
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}


module.exports = { home, register, login, user }