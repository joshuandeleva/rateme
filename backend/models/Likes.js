const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema(
    {
        likeRequestId: {
            type: Schema.Types.ObjectId,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: User,
        },
        recepient: {
            type: Schema.Types.ObjectId,
            ref: User,
        },
        likeStatus: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Likes", likeSchema);