import { Args, Mutation, Resolver } from 'type-graphql';

import CreateUserDto from '../dto/User.Create.dto';
import UserDto from '../dto/User.dto';
import UpdateUserDto from '../dto/User.Update.dto';
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
}