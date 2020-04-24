import * as mongoose from 'mongoose';
import { Arg, Args, Mutation, Resolver } from 'type-graphql';

import UserSchema from '../../User/User.schema';
import AvailableShiftSchema from '../AvailableShifts.schema';
import CreateAvailableShiftDto from '../dto/AvailableShifts.Create.dto';
import AvailableShiftDto from '../dto/AvailableShifts.dto';
import UpdateAvailableShiftDto from '../dto/AvailableShifts.Update.dto';

const { Types: { ObjectId } } = mongoose
@Resolver()
export default class AvailableShiftQueryResolver {
    @Mutation(() => AvailableShiftDto, { nullable: true })
    async updateAvailableShift(@Args() input: UpdateAvailableShiftDto): Promise<AvailableShiftDto> {
        return await AvailableShiftSchema.findByIdAndUpdate(input._id, { $set: input }, { new: true }).lean();
    }

    @Mutation(() => AvailableShiftDto, { description: "Use to post an AvailableShift." })
    async postAvailableShift(@Args() input: CreateAvailableShiftDto): Promise<AvailableShiftDto> {
        const createdShift = await AvailableShiftSchema.create(input)
        await UserSchema.findByIdAndUpdate({ _id: input.user_id }, { $addToSet: { availableShifts: ObjectId(createdShift._id) } })
        return createdShift
    }

    @Mutation(() => Boolean, { description: "Use to delete an AvailableShift. This cannot be reversed", nullable: true })
    async deleteAvailableShift(@Arg('id') id: string): Promise<boolean> {
        const deleted = await AvailableShiftSchema.findByIdAndDelete(id)
        if (!deleted) return false;
        return true;
    }

    // TODO
    @Mutation(() => Boolean, { description: "Use to claim an AvailableShift.", nullable: true })
    async claimAvailableShift(@Arg('id') id: string): Promise<boolean> {
        const deleted = await AvailableShiftSchema.findByIdAndDelete(id)
        if (!deleted) return false;
        return true;
    }
}