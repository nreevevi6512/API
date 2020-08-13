const mongoose = require("mongoose")

const ninjaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ninjaChannel: {
        type: String,
        required: true
    },
    NinjaDate: {
        type: String,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("ninja", ninjaSchema)