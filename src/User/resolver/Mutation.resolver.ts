import { Arg, Args, Mutation, Resolver } from 'type-graphql';

import { fb } from '../../../index';
import AvailableShiftDto from '../dto/classes/AvailableShift.dto';
import CreateUserDto from '../dto/User.Create.dto';
import UserDto from '../dto/User.dto';
import UpdateUserDto from '../dto/User.Update.dto';
import UpdateUserShiftsDto from '../dto/User.UpdateShifts.dto';
import UserSchema from '../User.schema';

@Resolver()
export default class UserQueryResolver {
    @Mutation(() => UserDto, { description: "Use to create one User. Date must be passed as a string. Must use date.toISOString() if updating start/end.", nullable: true })
    async createUser(@Args() input: CreateUserDto): Promise<UserDto> {
        input.shifts = []
        input.preferences = []
        input.clockIns = []
        input.clockOuts = []
        return await UserSchema.create(input)
    }

    @Mutation(() => UserDto, { description: "Use to update any part of one User. Date must be passed as a string. Must use date.toISOString() if updating start/end.", nullable: true })
    async updateUser(@Args() input: UpdateUserDto): Promise<UserDto> {
        const { _id, ...rest } = input
        return await UserSchema.findByIdAndUpdate(_id, { $set: { ...rest } }, { new: true }).lean();
    }

    @Mutation(() => [UserDto], { description: "Use to update many users' shifts.", nullable: true })
    async updateUsersShifts(@Args() input: UpdateUserShiftsDto): Promise<UserDto[]> {
        const convertedInput = {}
        const ids = []
        input.users.forEach(({ _id, shifts }) => {
            convertedInput[_id.toString()] = shifts;
            ids.push(_id.toString())
        })
        const foundUsers = await UserSchema.find({ _id: { $in: ids } });
        foundUsers.forEach((foundUser) => {
            foundUser.shifts = convertedInput[foundUser._id];
            foundUser.save()
        })
        return foundUsers;
    }


    @Mutation(() => AvailableShiftDto, { description: "Use to add a shift to the trade board.", nullable: true })
    async addTradeBoardShift(@Arg('userID') userID: string, @Arg('shiftID') shiftID: string): Promise<AvailableShiftDto> {
        const foundUser = await UserSchema.findOne({ _id: userID, 'shifts._id': shiftID });
        if (!foundUser) throw new Error("No User could be found with that ID that also has that shift ID.")
        const foundShift = foundUser.shifts.find((shift) => shift._id.toString() == shiftID)
        foundShift.available = true;
        foundUser.markModified('shifts')
        foundUser.save()
        foundShift.full_user = foundUser
        return foundShift
    }

    @Mutation(() => Boolean, { description: "Use to remove a shift from the trade board." })
    async removeTradeBoardShift(@Arg('userID') userID: string, @Arg('shiftID') shiftID: string): Promise<boolean> {
        const foundUser = await UserSchema.findOne({ _id: userID, 'shifts._id': shiftID });
        if (!foundUser) throw new Error("No User could be found with that ID that also has that shift ID.")
        const foundShift = foundUser.shifts.find((shift) => shift._id.toString() == shiftID)
        foundShift.available = false;
        foundUser.markModified('shifts')
        foundUser.save()
        return true
    }

    @Mutation(() => Boolean, { description: "Use to clock in." })
    async clockIn(@Arg('email') email: string, @Arg('time') time: string, @Arg('location') location: string): Promise<boolean> {
        const foundUser = await UserSchema.findOne({ email });
        if (!foundUser) throw new Error("No User could be found with that ID.")
        if (foundUser.clockIns.length == 100)
            foundUser.clockIns.splice(0, 1)
        foundUser.clockIns.push({ time, location })
        foundUser.markModified('clockIns')
        foundUser.save()
        return true
    }

    @Mutation(() => Boolean, { description: "Use to clock out." })
    async clockOut(@Arg('email') email: string, @Arg('time') time: string, @Arg('location') location: string): Promise<boolean> {
        const foundUser = await UserSchema.findOne({ email });
        if (!foundUser) throw new Error("No User could be found with that ID.")
        if (foundUser.clockOuts.length == 100)
            foundUser.clockOuts.splice(0, 1)
        foundUser.clockOuts.push({ time, location })
        foundUser.markModified('clockOuts')
        foundUser.save()
        return true
    }

    @Mutation(() => Boolean, { description: "Use to delete a user. Not reversible.." })
    async deleteUser(@Arg('email') email: string): Promise<boolean> {
        const deletedUser = await UserSchema.findOneAndDelete({ email }).lean();
        if (deletedUser) {
            try {
                await fb.auth().deleteUser(deletedUser.firebaseID)
            } catch (e) {
                console.log("Error deleting firebase user:", e.message);
            } finally {
                return true;
            }
        }
        return false;
    }
}