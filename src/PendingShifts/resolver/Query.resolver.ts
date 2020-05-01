import { Query, Resolver } from 'type-graphql';

import PendingShiftDto from '../dto/PendingShift.dto';
import PendingShiftsSchema from '../PendingShifts.schema';

@Resolver()
export default class PendingShiftQuery {
    @Query(() => [PendingShiftDto])
    async getPendingShifts(): Promise<PendingShiftDto[]> {
        return await PendingShiftsSchema.find({}).lean();
    }
}