const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointmentModel");


const addAppointment = asyncHandler(async (req,res) => {
    const {
        doctor,
        user,
        scheduleDate,
        scheduleDay,
        startTime,
        endTime,
        reason,
        status
    } = req.body;

    try {
       
        var appointment = await Appointment.create({
            doctor,
            user,
            scheduleDate,
            scheduleDay,
            startTime,
            endTime,
            reason,
            status
        });
       
        appointment = await Appointment.findOne({_id: appointment._id }).populate("doctor", "-pass -role").populate("user", "-password -role");
        res.status(201).json(appointment);
       
    } catch (error) {
        res.status(400).json({err: error?.message});
    }
});

const getAllAppointment = asyncHandler(async (req,res) => {
    try {
        const appointment = await Appointment.find().sort({createdAt: -1}).populate("doctor", "-pass -role").populate("user", "-password -role");
    
        res.status(200).json(appointment);

    } catch (error) {
        res.status(500).json({err: error?.message});
    }
});


module.exports = {addAppointment, getAllAppointment}