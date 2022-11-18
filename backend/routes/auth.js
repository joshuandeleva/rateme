const router = require('express').Router();
const User = require("../models/user");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
const { verifyToken } = require("./verifyToken");
const user = require('../models/user');
router.post('/register', async (req, res) => {
    console.log(req)
    const newUser = new User({
        email: req.body.email,
        password: crypto.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        policy: req.body.policy,
        full_name: req.body.full_name,
        prefered_name: req.body.prefered_name,
        phone_number: req.body.phone_number,
        D_O_B: req.body.D_O_B,
        zodiacSign: getZodiacSign(req.body.D_O_B),
        gender: req.body.gender,
        find_in: req.body.find_in,
        isAdmin: req.body.isAdmin,
        image: req.body.imageUrl
    });
    console.log(newUser);
    try {
        const savedUser = await newUser.save();
        res.status(200).json({
            message: 'User created successfully',
            User: savedUser
            //console.log(savedUser);

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)

    }

});

//classify user according to the astrology

function getZodiacDate(zodiacBday) {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const month = months[zodiacBday.getMonth()];
    const zodiacDay = zodiacBday.getDate();
    const checkZodiac = {
        isAquarius: month == "jan" && zodiacDay >= 20 || month == "feb" && zodiacDay <= 19,
        isAries: month == "mar" && zodiacDay >= 21 || month == "apr" && zodiacDay <= 20,
        isCapricon: month == "dec" && zodiacDay >= 22 || month == "jan" && zodiacDay <= 19,
        isLibra: month == "sep" && zodiacDay >= 23 || month == "oct" && zodiacDay <= 22,
        isLeo: month == "jul" && zodiacDay >= 23 || month == "aug" && zodiacDay <= 22,
        isSagittarius: month == "nov" && zodiacDay >= 23 || month == "dec" && zodiacDay <= 21,
        isPisces: month == "feb" && zodiacDay >= 20 || month == "mar" && zodiacDay <= 20,
        isTaurus: month == "apr" && zodiacDay >= 21 || month == "may" && zodiacDay <= 20,
        isGemini: month == "may" && zodiacDay >= 21 || month == "jun" && zodiacDay <= 20,
        isVirgo: month == "aug" && zodiacDay >= 23 || month == "sep" && zodiacDay <= 22,
        isScorpio: month == "oct" && zodiacDay >= 23 || month == "nov" && zodiacDay <= 22,
        isCancer: month == "jun" && zodiacDay >= 21 || month == "jul" && zodiacDay <= 22
    }
    return checkZodiac;
}

function getZodiacSign(userBirthday) {
    const userBday = new Date(userBirthday);
    const zodiacsObj = getZodiacDate(userBday);

    let zodiac = '';
    if (zodiacsObj.isAquarius) {
        zodiac = 'aquarius'
    } else if (zodiacsObj.isLeo) {
        zodiac = 'leo'
    } else if (zodiacsObj.isLibra) {
        zodiac = 'libra'
    } else if (zodiacsObj.isAries) {
        zodiac = 'aries';
    } else if (zodiacsObj.isCancer) {
        zodiac = 'cancer';
    } else if (zodiacsObj.isVirgo) {
        zodiac = 'virgo'
    } else if (zodiacsObj.isCapricon) {
        zodiac = 'capricon'
    } else if (zodiacsObj.isGemini) {
        zodiac = 'gemini'
    } else if (zodiacsObj.isPisces) {
        zodiac = 'pisces'
    } else if (zodiacsObj.isScorpio) {
        zodiac = 'scorpio'
    } else if (zodiacsObj.isSagittarius) {
        zodiac = 'sagittarius';
    } else if (zodiacsObj.isTaurus) {
        zodiac = 'taurus'
    } else {
        zodiac = 'unknown'
    }

    return zodiac;
}
// remove  this
//getZodiacSign()

//login user

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Email not found kindly regsiter! ' });
        }
        const hashedpassword = crypto.AES.decrypt(user.password, process.env.PASS_SEC).toString(crypto.enc.Utf8);
        if (hashedpassword !== req.body.password) {
            return res.status(401).json({ message: 'Email and Password do not match' });
        }
        const { password, ...userWithoutPassword } = user.toObject();
        const accessToken = jwt.sign({
            user: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.header("accesstoken", accessToken).json({
            message: 'Auth successful',
            //user: user
            user: userWithoutPassword,
            accessToken
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }


});
//Forgot password
router.post("/forgotpassword", async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json("User does exists !!")

        } else {
            const secret = process.env.JWT_SECRET + user.password;
            const token = jwt.sign({ email: user.email, id: user._id }, secret, {
                expiresIn: "1hr"
            });

            const link = `http://localhost:5000/api/auth/reset-password/${user._id}/${token}`;
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "elijahkungu100@gmail.com",
                    pass: "yfppdwlgikaumbrd",
                },
            });

            var mailOptions = {
                from: "elijahkungu100@gmail.com",
                to: email,
                subject: "Password Reset",
                text: link,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });

            console.log(link);
            res.status(200).json({ link })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });

    }



});
//reset passwword
router.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    // res.send("DONE")
    console.log(req.params);
    const user = await User.findOne({ _id: id });
    if (!user) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.JWT_SECRET + user.password;
    try {
        const verify = jwt.verify(token, secret);
        res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
        console.log(error);
        res.send("Not Verified");
    }
});
router.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ _id: id });
    if (!user) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.JWT_SECRET + user.password;
    try {
        const verify = jwt.verify(token, secret);

        const encryptedPassword = await crypto.AES.encrypt(password, process.env.PASS_SEC).toString()
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );


        res.render("index", { email: verify.email, status: "verified" });
        // res.json({ status: "Password Updated" });
    } catch (error) {
        console.log(error);
        res.json({ status: "Something Went Wrong" });
    }
});
//is user logeed in

router.get('/isUserAuth', verifyToken, async (req, res) => {
    return res.json({ isLoggedIn: true, user: req.user });

})

module.exports = router;