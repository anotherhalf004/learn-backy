const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
    image : String,
    caption : String
})

const postModel = mongoose.model("post",postSchema); // "post" is name of Collection in the database

module.exports = postModel;

