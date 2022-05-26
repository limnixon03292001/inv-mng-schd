const asyncHandler = require("express-async-handler");
const AdminNotif = require("../models/adminNotifModel");



const addNotif = asyncHandler(async (req,res) => {
    const { pic, description } = req.body;

    try {
        var adminNotif = await AdminNotif.create({ pic, description });
        res.status(201).json(adminNotif);
    } catch (error) {
        res.status(400).json({err: error?.message});
    }

});

const getNotif = asyncHandler(async (req,res) => {
    try {
        const adminNotif = await AdminNotif.find().sort({createdAt: -1})
    
        res.status(200).json(adminNotif);

    } catch (error) {
        res.status(500).json({err: error?.message});
    }
});

module.exports = {addNotif,getNotif}