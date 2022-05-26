const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const doctorModel = mongoose.Schema(
    {
        name: {type: String, required: true},
        specialty: { type: String, required: true },
        email: {type: String, required: true, unique: true, validate: [validator.isEmail, "Invalid Email!"]},
        pass: {type: String, required: true },
        contact: { type: Number, required: true },
        pic: {
            type: String, 
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        role: {type: Number, required: true}
    },
    {
        timestamps: true,
    }
)

doctorModel.pre("save", async function(next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.pass = await bcrypt.hash(this.pass, salt);
})


const Doctor = mongoose.model("Doctor", doctorModel);

module.exports = Doctor;