const {Schema, model} = require('mongoose');
const { create } = require('./blog');

const commentSchema = new Schema({ 
    content:{
        type: String,
        required: true,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blogId:{
        type: Schema.Types.ObjectId,
        ref: "User",

    }
    
}, {timestamps: true});

const Comment = model("Comment", commentSchema);

module.exports = Comment;