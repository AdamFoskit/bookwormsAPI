import * as mongoose from 'mongoose';

import { EventSchema } from '../EventGenerics/Event.schema';

const UserSchema = new mongoose.Schema({
    firebaseID: String,
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    userType: String,
    color: String,
    shifts: [{ ...EventSchema, default: [] }],
    preferences: [{ ...EventSchema, default: [] }],
    clockIns: [{ time: String, location: String, }],
    clockOuts: [{ time: String, location: String, default: [] }]
});

export default mongoose.model('User', UserSchema);