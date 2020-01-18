"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
    address: {
        city: { type: String },
        state: { type: String },
        street: { type: String },
        zip: { type: Number },
    },
    first_name: { type: String },
    last_name: { type: String },
    teams: [{ type: mongoose.Types.ObjectId }],
    favorites: [{ type: mongoose.Types.ObjectId }],
});
exports.default = mongoose.model('Test', testSchema);
