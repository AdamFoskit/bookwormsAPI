import * as mongoose from 'mongoose';

const BlackoutSchema = new mongoose.Schema({
    start: String,
    end: String,
});

export default mongoose.model('Blackout', BlackoutSchema);