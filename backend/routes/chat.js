const router = require("express").Router();

const conversationSchema = require("../models/conversationSchema");
const userSchema = require("../models/user");

//auth middlewares

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

//create a chat

router.post("/", verifyToken, async (req, res) => {
    //get user id of currently logged in

    const { userId } = req.body;
    //console.log('debugiihng', userId);

    //query user


    //console.log('Myuser', myUser);

    const myUser = await userSchema.findById(req.user.user)
    const myUserId = myUser._id.toHexString();
    console.log('MyUserId', myUserId);
    const newId = "62c1f76928dca4af2ec95010"
    //console.log('Here is my user', myUser);
    //return a chat with this  user id or create

    if (!userId) {
        console.log("userId param not send with request");
        return res.sendStatus(400);
    }
    //console.log(userId, req.user._id);
    var isChat = await conversationSchema
        .find({
            //both users id
            $and: [
                { users: { $elemMatch: { $eq: newId } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
        .populate("users", "-password")
        .populate("lastMessage");
    isChat = await userSchema.populate(isChat, {
        path: "lastMessage.from",
        select: "prefered_name image email",
    });
    //if the chat exists

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        //create a new chat

        var newChat = {
            chatName: "from",
            users: [req.newId, userId],
        };
        try {
            const createdChat = await conversationSchema.create(newChat);
            const fullChat = await conversationSchema
                .findOne({
                    _id: createdChat._id,
                })
                .populate("users", "-password");
            res.status(200).json(fullChat);

            console.log(newChat.users);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

//fetch chats

router.get("/", verifyToken, async (req, res) => {
    try {
        conversationSchema
            .find({
                users: {
                    $elemMatch: {
                        $eq: req.user._id,
                    },
                },
            })
            .populate("users", "-password")
            .populate("lastMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await userSchema.populate(results, {
                    path: "lastMessage.from",
                    select: "prefered_name image email",
                })
                res.status(200).send(results)
            })
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
module.exports = router;
