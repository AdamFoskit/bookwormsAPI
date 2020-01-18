"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
    personal: {
        first_name: { type: String },
        last_name: { type: String },
    },
    email: { type: String },
});
exports.default = mongoose.model('Test', testSchema);
