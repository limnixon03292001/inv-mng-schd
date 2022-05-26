const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");

const registerAdmin = asyncHandler(async (req,res) => {
    const {
        firstName,
        lastName,
        username,
        pass,
        pic,
        role
    } = req.body;

    // if(!name || !email || !password){
    //     res.status(400).json({err: Admin already exists"})
    // }

   
    try {
        const adminExists = await Admin.findOne({ username });

        if(adminExists) {
            return res.status(400).json({err:"username already exist!"})
        }

        const admin = await Admin.create({
            firstName,
            lastName,
            username,
            pass,
            pic,
            role
        });

        if(admin){
            res.status(201).json({
                firstName: admin?.firstName,
                lastName:  admin?.lastName,
                username:  admin?.username,
                pic:  admin?.pic,
                role: admin?.role,
            });
        }else {
            res.status(400).json({err:"Failed to create admin account"})
        }
        
    } catch (error) {
        res.status(400).json({err: error?.message})
    }
});

//All record of admin accounts
const getAdmin = asyncHandler(async (req,res) => {

    try {
        const admin = await Admin.find();
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({err: error?.message});
    }
});

const authAdmin = asyncHandler(async (req,res) => {
    const { username, pass } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if(!admin){
           return res.status(400).json({err:"username doesn't exist!"});
        }
    
        const auth = await bcrypt.compare(pass, admin.pass);
    
        //fires when password is incorrect
        if(!auth){
            return res.status(400).json({err:"Password is incorrect!"});
        }
        
        // if all goods then authorize the admin
        res.status(200).json({
            _id: admin._id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            pic: admin.pic,
            role: admin?.role,
            token: generateToken(admin._id)
        });
    } catch (error) {
        res.status(400).json({err:"Failed to log in"})
    }
});

module.exports = {registerAdmin, getAdmin, authAdmin}