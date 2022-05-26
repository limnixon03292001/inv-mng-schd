const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userModel = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, validate: [validator.isEmail, "Invalid Email!"] },
        password: { type: String, required: true }, 
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        contact: { type: Number, required: true },
        address: { type: String, required: true },
        pic: {
            type: String, 
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        role:{ type: Number, required: true },
    
    },
    {
        timestamps: true,
    }
)


userModel.pre("save", async function(next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userModel);

module.exports = User;