const mongoose = require("mongoose");

const adminNotifModel = mongoose.Schema(
    {
        pic: {type: String, required:true},
        description: { type: String, required: true },
        new: { type: Boolean, required: true, default: true },
    },
    {
        timestamps: true,
    }
)



const AdminNotif = mongoose.model("AdminNotif", adminNotifModel);

module.exports = AdminNotif;