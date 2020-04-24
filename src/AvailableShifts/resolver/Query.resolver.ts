import { Arg, Query, Resolver } from 'type-graphql';

import AvailableShiftSchema from '../AvailableShifts.schema';
import AvailableShiftDto from '../dto/AvailableShifts.dto';

@Resolver(() => AvailableShiftDto)
export default class AvailableShiftQueryResolver {
    @Query(() => [AvailableShiftDto], { description: "Get all AvailableShifts." })
    async getAvailableShifts(): Promise<AvailableShiftDto[]> {
        return await AvailableShiftSchema.find({}).lean();
    }

    @Query(() => AvailableShiftDto, { description: "Get one AvailableShift. If no AvailableShift can be found with the supplied ID, this will return null.", nullable: true })
    async getAvailableShiftByID(@Arg('id') id: string): Promise<AvailableShiftDto> {
        return await AvailableShiftSchema.findById(id).lean();
    }
}