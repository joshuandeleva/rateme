const mongoose = require("mongoose");
const disLikeSchema = new mongoose.Schema(
    {
        dislikeId: {
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
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Matches", disLikeSchema);