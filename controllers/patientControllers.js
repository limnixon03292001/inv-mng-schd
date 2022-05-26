const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");

const addPatient = asyncHandler(async (req,res) => {
    const {
        firstName,
        lastName,
        age,
        religion,
        contact,
        address,
        birthPlace,
        gender,
        civilStatus,
        dateOfBirth,
        pic,
    } = req.body;
   
    try {

        const patient = await Patient.create({
            firstName,
            lastName,
            age,
            religion,
            contact,
            address,
            birthPlace,
            gender,
            civilStatus,
            dateOfBirth,
            pic,
        });

        if(patient){
            res.status(201).json(patient)
        }else {
            res.status(400).json({err:"Failed to create patient record"})
        }
        
    } catch (error) {
        res.status(400).json({err: error?.message})
    }
    
});

const getPatient = asyncHandler(async (req,res) => {

    try {
        const patient = await Patient.find();
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({err: error?.message});
    }
});

const searchPatient = asyncHandler(async(req,res) => {
    const keyword = req.query.search ?
    {
        $or: [
            {firstName: {$regex: req.query.search, $options: "i" }},
            {lastName: {$regex: req.query.search, $options: "i" }}
        ],
    }
    :
    {};
    const patient = await Patient.find(keyword);
    res.status(200).json(patient);
})

module.exports = {addPatient, getPatient, searchPatient}