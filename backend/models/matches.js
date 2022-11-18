const mongoose = require("mongoose");
const matchesSchema = new mongoose.Schema(
    {
        matchRequestId: {
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
        matchRequestStatus: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Matches", matchesSchema);
