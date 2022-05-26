const mongoose = require("mongoose");

const doctorScheduleModel = mongoose.Schema(
    {
        doctor: {type: mongoose.Schema.Types.ObjectId, ref: "Doctor"},
        scheduleDate: {type: Date ,required: true},
        scheduleDay: {type: String, required: true},
        startTime: {type: String, required: true},
        endTime: {type: String, required: true},
        // expireAt: {type:Date, required: true,},
    },
    {
        timestamps: true,
    }
)



const DoctorSchedule = mongoose.model("DoctorSchedule", doctorScheduleModel);

module.exports = DoctorSchedule;