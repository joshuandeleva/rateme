const User = require("../models/user");
const crypto = require("crypto-js");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

///UPDATE
//http://localhost:5000/api/user/63051cc46cd80438d47c0949
router.put("/update/:id", async (req, res) => {
    if (req.body.password) {
        req.body.password = crypto.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()

    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
            $set: req.body,
        }, { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER
router.get("/find/:id", verifyToken, async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        return res.status(200).json([user]);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get("/", verifyTokenAndAuthorization, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ?
            await User.find().sort({ _id: -1 }).limit(4) :
            await User.find();
        return res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/", verifyToken, async (req, res) => {
    const userId = req.query.userId;
    const preferred_name = req.query.preferred_name;
    try {
        const user = userId ?
            await User.findById(userId) :
            await User.findOne({ prefered_name: preferred_name });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get("/all", async (req, res) => {
    try {
        let users = await User.find();
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc
            return otherDetails
        })
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }

})

router.get("/:id", verifyToken, async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        return res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }

})


//update user location settings

router.post("/user/location", async (req, res) => {

    try {
        const user = await User.findByIdAndUpdate(req.body.id, {
            coords: { lat: req.body.lat, lon: req.body.lon }

        })
        res.status(200)

    } catch (error) {
        console.log(error);
    }

})


//mathced users according to star

router.get('/matches', verifyToken, async (req, res) => {
    const zodiacSign = req.params.zodiacSign
    try {
        const query = { zodiac_Sign: { $eq: zodiacSign } }
        const user = await User.find(query).toArray()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;