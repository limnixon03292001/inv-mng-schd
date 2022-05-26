const mongoose = require("mongoose");
const validator = require("validator");

const patientModel = mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: Number, required: true },
        religion: { type: String, required: true },
        contact: { type: Number, required: true },
        address: { type: String, required: true },
        birthPlace: { type: String, required: true },
        gender: { type: String, required: true },
        civilStatus: { type: String, required: true },
        dateOfBirth: {type: Date ,required: true},
        pic: {
            type: String, 
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
    },
    {
        timestamps: true,
    }
)


const Patient = mongoose.model("Patient", patientModel);

module.exports = Patient;