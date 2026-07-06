const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/storage.services');
const postModel = require('./models/post.model');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json()); // this middleware wont work as we are using ```form-data```

const upload = multer({ storage : multer.memoryStorage() })

app.post('/create-post', upload.single('image'), async (req,res) => {

    const  result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
        image : result.url,
        caption : req.body.caption
    })

    return res.status(201).json({
        message : 'Post created',
        post : post
    });

})

app.get('/posts',async (req,res) => {
    
    const posts = await postModel.find();

    return res.status(200).json({
        message : 'All posts fetched',
        Posts : posts
    })
})



module.exports = app