import * as mongoose from 'mongoose';

import { EventSchema } from '../EventGenerics/Event.schema';

const UserSchema = new mongoose.Schema({
    firebaseID: String,
    email: String,
    firstName: String,
    lastName: String,
    shifts: [{ ...EventSchema, default: [] }],
    preferences: [{ ...EventSchema, default: [] }]
});

export default mongoose.model('User', UserSchema);