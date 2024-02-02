const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
    username: {
        type: String,
        reuiqred: true
    },
    email: {
        type: String,
        reuiqred: true,
    },
    message: {
        type: String,
        required: true
    }
})


const Contact = new model('Contact',contactSchema)

module.exports = Contact