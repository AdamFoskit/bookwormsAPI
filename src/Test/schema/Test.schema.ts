/* eslint-disable @typescript-eslint/camelcase */
import * as mongoose from 'mongoose';

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

export default mongoose.model('Test', testSchema);
