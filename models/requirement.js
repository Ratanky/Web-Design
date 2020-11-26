const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requirementSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rolerquisit: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
    }
});

