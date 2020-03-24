import { Arg, Query, Resolver } from 'type-graphql';

import UserDto from '../dto/User.dto';
import UserSchema from '../User.schema';

@Resolver(() => UserDto)
export default class UserQueryResolver {
    @Query(() => [UserDto], { description: "Get all Users." })
    async getUsers(): Promise<UserDto[]> {
        return await UserSchema.find({}).lean();
    }

    @Query(() => UserDto, { description: "Get one User. If no User can be found with the supplied ID, this will return null.", nullable: true })
    async getUserByID(@Arg('id') id: string): Promise<UserDto> {
        return await UserSchema.findById(id).lean();
    }
}