const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        reuiqred: true
    },
    email: {
        type: String,
        reuiqred: true,
        unique: true
    },
    phone: {
        type: String,
        reuiqred: true
    },
    password: {
        type: String,
        reuiqred: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.pre("save", async function (next) {

    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        // const saltRound = 10;
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
})

userSchema.methods.comparePassword = async function (password) {
    return  bcrypt.compare(password, this.password)
}


userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        }, process.env.JWT_KEY, { expiresIn: "30d", })
    } catch (error) {
        console.error(error)
    }
}

const User = new mongoose.model("user", userSchema)

module.exports = User