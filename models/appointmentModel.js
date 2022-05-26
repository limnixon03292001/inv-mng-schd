const mongoose = require("mongoose");

const appointmentModel = mongoose.Schema(
    {
        doctor: {type: mongoose.Schema.Types.ObjectId, ref: "Doctor"},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        scheduleDate: {type: Date ,required: true},
        scheduleDay: {type: String, required: true},
        startTime: {type: String, required: true},
        endTime: {type: String, required: true},
        reason: {type:String},
        status: {type:String, required:true, default: "Booked"}
    },
    {
        timestamps: true,
    }
)



const Appointment = mongoose.model("Appointment", appointmentModel);

module.exports = Appointment;