import { Arg, Args, Mutation, Resolver } from 'type-graphql';

import BlackoutSchema from '../Blackout.schema';
import CreateBlackoutDto from '../dto/Blackout.Create.dto';
import BlackoutDto from '../dto/Blackout.dto';
import UpdateBlackoutDto from '../dto/Blackout.Update.dto';

@Resolver()
export default class BlackoutQueryResolver {
    @Mutation(() => BlackoutDto, { description: "Use to create one Blackout. Date must be passed as a string. Must use date.toISOString() if updating start/end.", nullable: true })
    async createBlackout(@Args() input: CreateBlackoutDto): Promise<BlackoutDto> {
        return (await BlackoutSchema.create(input)).toObject()
    }

    @Mutation(() => BlackoutDto, { description: "Use to update any part of one Blackout. Date must be passed as a string. Must use date.toISOString() if updating start/end.", nullable: true })
    async updateBlackout(@Args() input: UpdateBlackoutDto): Promise<BlackoutDto> {
        return await BlackoutSchema.findByIdAndUpdate(input._id, { $set: input }, { new: true }).lean();
    }

    @Mutation(() => Boolean, { description: "Use to delete a blackout date. This cannot be reversed", nullable: true })
    async deleteBlackout(@Arg('id') id: string): Promise<boolean> {
        const deleted = await BlackoutSchema.findByIdAndDelete(id)
        if (!deleted) return false;
        return true;
    }
}