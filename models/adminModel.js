const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminModel = mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        username: { type: String, required: true, unique: true, },
        pass: { type: String, required: true },
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

adminModel.pre("save", async function(next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.pass = await bcrypt.hash(this.pass, salt);
})


const Admin = mongoose.model("Admin", adminModel);

module.exports = Admin;