const router  = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");

// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET || "abiAB"; 

// Sign-In Route
router.post("/sign-in", async (req, res) => {
    

try {
    const {username} = req.body;
    const {email} = req.body;

    const existingUser = await User.findOne({ username: username });
    const existingEmail = await User.findOne({ email: email });

    if (existingUser){ return res.status(400).json({ message: "Username already exists" });
}else if (username.length < 4) {
    return res.status(400).json({ message: "Username must have at least 4 characters" });
}

if (existingEmail) {return res.status(400).json({ message: "Email already exists" });
} 
const hashPass = await bcrypt.hash(req.body.password, 10);
const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPass,
});
await newUser.save();
res.status(200).json({ message: "Sign-In Successful" });
    
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    
}
});


// Log-In Route
router.post("/log-in", async (req, res) => {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username : username });
        if (!existingUser) {return res.status(400).json({ message: "Invalid Credentials" });
         }
         bcrypt.compare(password, existingUser.password, (err, data) =>{
            if(data) {
                const authClaims = [{ name: username},{ jti: jwt.sign({},"abiAB")}];
                const token= jwt.sign({ authClaims }, "abiAB",{expiresIn: "2d"});
                res.status(200).json({id: existingUser._id, token: token})

            }
            else{
                return res.status(400).json({ message: "Invalid Credentials" });
            }

         });
});

module.exports = router;
