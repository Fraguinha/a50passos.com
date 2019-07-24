const mongoose = require("mongoose")

const house_schema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    tip: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo1: {
        type: String,
        required: true
    },
    photo2: {
        type: String,
        required: true
    },
    photo3: {
        type: String,
        required: true
    },
    photo4: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("House", house_schema)
