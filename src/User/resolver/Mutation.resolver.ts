import { Arg, Args, Mutation, Resolver } from 'type-graphql';

import CreateUserDto from '../dto/User.Create.dto';
import UserDto from '../dto/User.dto';
import UpdateUserDto from '../dto/User.Update.dto';
import UpdateUserShiftsDto from '../dto/User.UpdateShifts.dto';
import UserSchema from '../User.schema';

@Resolver()
export default class UserQueryResolver {
    @Mutation(() => UserDto, { description: "Use to create one User. Date must be passed as a string. Must use date.toISOString() if updating start/end.", nullable: true })
    async createUser(@Args() input: CreateUserDto): Promise<UserDto> {
        return await UserSchema.create(input)
    }

    @Mutation(() => UserDto, { description: "Use to update any part of one User. Date must be passed as a string. Must use date.toISOString() if updating start/end.", nullable: true })
    async updateUser(@Args() input: UpdateUserDto): Promise<UserDto> {
        const { _id, ...rest } = input
        if ('preferences' in rest && !rest.preferences)
            rest.preferences = []
        if ('shifts' in rest && !rest.shifts)
            rest.shifts = []
        return await UserSchema.findByIdAndUpdate(_id, { $set: { ...rest } }, { new: true }).lean();
    }

    @Mutation(() => [UserDto], { description: "Use to update many user's shifts.", nullable: true })
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

    @Mutation(() => Boolean, { description: "Use delete a user. Not reversible.." })
    async deleteUser(@Arg('id') id: string): Promise<boolean> {
        await UserSchema.findByIdAndDelete(id).lean();
        return true;
    }
}