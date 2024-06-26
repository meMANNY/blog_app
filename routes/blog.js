const {Router} = require('express');

const router = Router();
const multer = require("multer");
const path = require("path");

const Blog = require('../models/blog');
const user = require('../models/user');
const Comment = require('../models/comment');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.resolve(`./public/uploads/`))
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()*1E9)
        cb(null,file.fieldname+'-'+ uniqueSuffix)
    }
})

const upload = multer({storage: storage});

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    });
});
router.get("/:id", async(req,res)=>{
        const blog = await Blog.findById(req.params.id);
        return res.render("blog",{
            user: req.user,
            blog,
        })
    } )

router.post("/comment/:blogId",async(req,res)=>{
    await Comment.create({
        content: req.body.content,
        createdBy: req.user._id,
        blogId: req.params.blogId,
    });
    return res.redirect(`/blog/${req.params.blogId}`); 
})    

router.post("/", upload.single("coverImage"), async (req,res)=>{
    const {title,body} = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`,
    })
    return res.redirect(`/blog/${blog._id}`);
})

module.exports = router;