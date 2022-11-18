const router = require('express').Router();
const Message = require('../models/messageSchema')

//@POST url api/message 
router.post('/', async (req, res) => {

    //content of the message body
    const newMessage = new Message(req.body)

    try {

        //save the message
        const savedMessage = await newMessage.save();

        res.status(200).json(savedMessage)

    } catch (error) {
        res.status(500).json(error)
    }
})

//@GET url api/message/:userId

router.get('/:conversationId', async (req, res) => {
    try {
        const getMessage = await Message.find({
            conversationId: req.params.conversationId
        })

        res.status(200).json(getMessage)

    } catch (error) {
        res.status(500).json(error)
    }

})
module.exports = router