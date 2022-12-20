const mongoose = require('mongoose')

const launchesSchema = mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        default: 100,
        min:100,
        max:999
    },
    launchDate: Date,
    mission: String,
    rocket: String,
    target:{
        type: String,       
    },
    costumers: [String],
    upcoming: Boolean,
    success:{
        type: Boolean,
        default: true
    } 
})
module.exports = mongoose.model('launch',launchesSchema)