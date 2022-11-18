const router = require("express").Router();
const Conversation = require("../models/conversationSchema");

//start new conversation
router.post("/", async (req, res) => {
  const senderId = req.body.senderId;
  const receiver = req.body.receiverId;
  const OldConversation = await Conversation.findOne({
    members: [req.body.senderId, req.body.receiverId],
  });
  if (!OldConversation) {
    res.status(400).json("Conversation already exist ");
  }
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  //save to mongodb
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get conversation

router.get("/:userId", async (req, res) => {
  //get the conversation
  try {
    const conversation = await Conversation.find({
      members: {
        $in: [req.params.userId],
      },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//detete conversation

module.exports = router;
