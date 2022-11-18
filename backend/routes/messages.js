const router = require("express").Router();
const mongoose = require("mongoose");

const { verifyToken } = require("./verifyToken");
const messageSchema = require("../models/messageSchema");
const userSchema = require("../models/user");
const conversationSchema = require("../models/conversationSchema");

// send a message
router.post("/", verifyToken, async (req, res) => {
    const { chatId, content } = req.body;

    let to = mongoose.Types.ObjectId(req.body.to);

    //check this data dont exist  message

    if (!chatId || !content) {
        console.log("Invalid data passed into request");
        res.sendStatus(400);
    }

    //create a new message

    var newMessage = {
        from: req.user._id,
        to: req.body.to,
        content: text,
        chat: chatId,
    };

    //querry database
    try {
        var message = await messageSchema.create(newMessage);

        //populate content

        message = await message.populate("from", "image preferred_name");
        message = await message.populate("chat");
        message = await userSchema.populate(message, {
            path: "chat.users",
            select: "preferred_name image email",
        });
        message = await message.populate("to", "image preferred_name");

        //update the chat
        await conversationSchema.findByIdAndUpdate(req.body.chatId, {
            lastMessage: message,
        });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

//fetch all chats

router.get("/:chatId", verifyToken, async (req, res) => { });

module.exports = router;
