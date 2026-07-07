const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post('/create',async (req,res) => {

    const token = req.cookies.token;

    if(!token){
        res.status(401).json({
            message : "Unauthorized ( Register first )"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ _id: decoded.id });

        console.log(user);

    } catch (error) {
        res.status(401).json({
            message : "Unauthorized"
        })
    }
    
    
})



module.exports = router;