import * as mongoose from 'mongoose';

import { EventSchema } from '../EventGenerics/Event.schema';

const AvailableShiftsSchema = new mongoose.Schema({ shift: { ...EventSchema }, user_id: String });

export default mongoose.model('AvailableShifts', AvailableShiftsSchema);