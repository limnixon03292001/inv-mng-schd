const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const Doctor = require("../models/doctorModel");
const DoctorSchedule = require("../models/doctorScheduleModel");

const registerDoctor = asyncHandler(async (req,res) => {
    const {
        name,
        specialty,
        email,
        pass,
        contact,
        pic,
        role,
    } = req.body;

    // if(!name || !email || !password){
    //     res.status(400).json({err: Doctor already exists"})
    // }

    try {
        const doctorExists = await Doctor.findOne({ email });

        if(doctorExists) {
            return res.status(400).json({err:"Email already exist!"})
        }

        const doctor = await Doctor.create({
            name,
            specialty,
            email,
            pass,
            contact,
            pic,
            role,
        });

        if(doctor){
            res.status(201).json({
                name: doctor?.name,
                specialty:  doctor?.specialty,
                email:  doctor?.email,
                pass: doctor?.pass,
                contact: doctor?.contact,
                pic:  doctor?.pic,
                role: doctor?.role,
            });
        }else {
            res.status(400).json({err:"Failed to create doctor account"})
        }
        
    } catch (error) {
        res.status(400).json({err: error?.message})
    }
});

//All record of doctor accounts
const getDoctor = asyncHandler(async (req,res) => {

    try {
        const doctor = await Doctor.find().sort({createdAt: -1});
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({err: error?.message});
    }
});

//delete doctor * testing
const deleteDoctor = asyncHandler(async (req,res) => {
    const {id} = req.body;
    // console.log(id);
    try {
        const doctor = await Doctor.findOneAndDelete({_id: id});
        await DoctorSchedule.deleteMany({doctor: id});
        res.status(200);

        // console.log(doctor);
        console.log('deleted Successfully')
    } catch (error) {
        res.status(500).json({err: error?.message});
    }
});

//this route is for doctor schedule
const getSchedule = asyncHandler(async (req,res) => {
    try {
        const doctorSchedule = await DoctorSchedule.find({}).populate({path:"doctor",select: "name specialty"});
    //    const doctorSchedulex = doctorSchedule.filter((doctorx) => {
    //        return doctorx?.doctor !== null
    //         console.log("h",doctorx?.doctor ) 
    //     })
        res.status(200).json(doctorSchedule);
        // console.log(doctorSchedulex)
    } catch (error) {
        res.status(500).json({err: error?.message});
    }
});

const getPublicSchedule = asyncHandler(async (req,res) => {
    try {
        const doctorSchedule = await DoctorSchedule.find().populate({path:"doctor",select: "name specialty pic"}).sort({createdAt: -1});
    //    const doctorSchedulex = doctorSchedule.filter((doctorx) => {
    //        return doctorx?.doctor !== null
    //         console.log("h",doctorx?.doctor ) 
    //     })
        res.status(200).json(doctorSchedule);
        // console.log(doctorSchedulex)
    } catch (error) {
        res.status(500).json({err: error?.message});
    }
});

const addSchedule = asyncHandler(async (req,res) => {
    const {
        doctor,
        scheduleDate,
        scheduleDay,
        startTime,
        endTime,
    } = req.body;
    // console.log(expireAt)
  
    try {
       
        var doctorSchedule = await DoctorSchedule.create({
            doctor,
            scheduleDate,
            scheduleDay,
            startTime,
            endTime,
            // expireAt
        });
       
        doctorSchedule = await doctorSchedule.populate("doctor", "name");

        res.status(201).json(doctorSchedule);

    } catch (error) {
        res.status(400).json({err: error?.message})

        console.log(error.message);
    }

});

module.exports = {registerDoctor, getDoctor, deleteDoctor, addSchedule, getSchedule, getPublicSchedule}