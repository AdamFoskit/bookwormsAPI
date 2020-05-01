import * as mongoose from 'mongoose';

import { EventSchema } from '../EventGenerics/Event.schema';

const PendingShiftSchema = new mongoose.Schema({
    ...EventSchema,
    fromUserID: String,
    toUserID: String,
});

export default mongoose.model('PendingShift', PendingShiftSchema);