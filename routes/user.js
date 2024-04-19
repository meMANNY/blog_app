const {Router} = require('express');
const User = require('../models/user');
const router = Router();




router.get("/signin", (req, res) => {
    return res.render("signin");
});
router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.post("/signin", async(req,res)=>{

    const {email,password} = req.body;

    try {
        const token = await User.matchPassword(email,password);
    
        console.log("Token", token);
        return res.cookie('token', token).redirect("/");
    } catch (error) {
        return res.render("signin",{error:
            "Invalid email or password"})
    }

})

router.post("/signup", async(req,res)=>{
    const{fullname, email, password} = req.body;

    await User.create({
        fullname,
        email,
        password,
    });
    return res.redirect("/");
})

module.exports = router;