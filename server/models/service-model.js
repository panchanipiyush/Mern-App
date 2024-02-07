const {Schema, model } = require("mongoose");

const serviceSchema = new Schema({
    services:{
        type:String,
        required:true
    },
    description :{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    provider:{
        type:String,
        required:true
    },

})


const service = new model("Service",serviceSchema);


module.exports = service;