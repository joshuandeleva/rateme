const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    policy: {
        type: Boolean,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    prefered_name: {
        type: String,
        required: true,

    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    newMessages: {
        type: Object,
        default: {}
    },
    D_O_B: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,

    },
    zodiacSign: {
        type: String,
        required: true
    },
    find_in: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    // iscategory: {
    //     type: String,
    //     required: true,
    //     default: "Tarus"
    // },
    image: {
        type: String,
        required: true

    },
    likes: {
        type: Array,
        default: []
    },
    matches: {
        type: Array,
        default: [],
    },
    work: {
        type: String,
        default: '',
    },
    school: {
        type: String,
        default: '',

    },
    coords: { lat: Number, lon: Number },
    passions: {
        type: Array,
        default: []
    },
    bio: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema)