import { Arg, Mutation, Resolver } from 'type-graphql';

import UserSchema from '../../User/User.schema';
import PendingShiftsSchema from '../PendingShifts.schema';

@Resolver()
export default class PendingShiftMutation {
    @Mutation(() => String)
    async addPendingShift(@Arg('shiftID') shiftID: string, @Arg('fromUserID') fromUserID: string, @Arg('toUserID') toUserID: string): Promise<string> {
        const foundFromUser = await UserSchema.findById(fromUserID).lean().select('shifts');
        if (!foundFromUser) throw new Error(`Cannot find user with ID: ${fromUserID}`)
        const foundShift = foundFromUser.shifts.find(({ _id }) => _id.toString() == shiftID);
        if (!foundShift) throw new Error(`Could not find a shift with ID: ${shiftID} for user with ID: ${fromUserID}`)
        const foundToUser = await UserSchema.findById(toUserID).lean();
        if (!foundToUser) throw new Error(`Cannot find user with ID: ${toUserID}`)
        const createdPending = await PendingShiftsSchema.create({ ...foundShift, fromUserID, toUserID })
        return createdPending._id
    }

    @Mutation(() => Boolean)
    async declinePendingShift(@Arg('shiftID') shiftID: string): Promise<boolean> {
        await PendingShiftsSchema.findByIdAndDelete(shiftID)
        return true
    }

    @Mutation(() => Boolean)
    async acceptPendingShift(@Arg('shiftID') shiftID: string): Promise<boolean> {
        const foundShift = await PendingShiftsSchema.findById(shiftID)
        if (!foundShift) throw new Error(`Unable to find PendingShift with ID: ${shiftID}`)
        const foundFromUser = await UserSchema.findById(foundShift.fromUserID);
        if (!foundFromUser) throw new Error(`Unable to find User with ID: ${foundShift.fromUserID}`)
        const foundToUser = await UserSchema.findById(foundShift.toUserID);
        if (!foundToUser) throw new Error(`Unable to find User with ID: ${foundShift.toUserID}`)
        const shiftIndex = foundFromUser.shifts.findIndex(({ _id }) => _id.toString() == shiftID);
        if (shiftIndex == -1)
            throw new Error(`Cannot find shift in fromUser with ID: ${shiftID}`)
        const [removedShift] = foundFromUser.shifts.splice(shiftIndex, 1)
        console.log({ removedShift });

        removedShift.available = false;
        foundToUser.shifts.push(removedShift)
        foundToUser.markModified('shifts')
        foundFromUser.markModified('shifts')
        foundToUser.save();
        foundFromUser.save();
        foundShift.remove();
        return true
    }
}