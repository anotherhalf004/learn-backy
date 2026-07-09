const express = require('express');

const validationRules = require('../middleware/validation.middleware')
const app = express();


app.get('/',(req,res) => {
    res.status(200).json({ message : 'hello'});
})

app.post('/register', validationRules.registerUserValidationRules, (req,res) => {
    const { username, email , pasasword} = req.body;
    res.status(200).json({message : "user registered"});
})

module.exports = app;