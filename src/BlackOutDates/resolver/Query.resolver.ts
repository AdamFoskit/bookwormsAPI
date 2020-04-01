import { Arg, Query, Resolver } from 'type-graphql';

import BlackoutSchema from '../Blackout.schema';
import BlackoutDto from '../dto/Blackout.dto';

@Resolver(() => BlackoutDto)
export default class BlackoutQueryResolver {
    @Query(() => [BlackoutDto], { description: "Get all Blackouts." })
    async getBlackouts(): Promise<BlackoutDto[]> {
        return await BlackoutSchema.find({}).lean();
    }

    @Query(() => BlackoutDto, { description: "Get one Blackout. If no Blackout can be found with the supplied ID, this will return null.", nullable: true })
    async getBlackoutByID(@Arg('id') id: string): Promise<BlackoutDto> {
        return await BlackoutSchema.findById(id).lean();
    }
}