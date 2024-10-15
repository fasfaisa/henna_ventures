const mongoose = require('mongoose');

const RepoSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('repository', RepoSchema)