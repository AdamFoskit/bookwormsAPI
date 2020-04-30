import { Arg, Query, Resolver } from 'type-graphql';

import AvailableShiftDto from '../dto/classes/AvailableShift.dto';
import UserDto from '../dto/User.dto';
import UserSchema from '../User.schema';

@Resolver(() => UserDto)
export default class UserQueryResolver {
    @Query(() => [UserDto], { description: "Get all Users." })
    async getUsers(): Promise<UserDto[]> {
        return await UserSchema.find({}).lean()
    }

    @Query(() => UserDto, { description: "Get one User. If no User can be found with the supplied ID, this will return null.", nullable: true })
    async getUserByID(@Arg('id') id: string): Promise<UserDto> {
        return await UserSchema.findById(id).lean();
    }

    @Query(() => UserDto, { description: "Get one User. If no User can be found with the supplied FirebaseID, this will return null.", nullable: true })
    async getUserByFirebaseID(@Arg('firebaseID') id: string): Promise<UserDto> {
        return await UserSchema.findOne({ firebaseID: id }).lean();
    }

    @Query(() => [AvailableShiftDto], { description: "Get one User. If no User can be found with the supplied FirebaseID, this will return null.", nullable: true })
    async getAvailableShifts(): Promise<AvailableShiftDto[]> {
        const foundUsers = await UserSchema.find({ 'shifts.available': { $eq: true } }).lean();
        let myReturn = []
        foundUsers.forEach((user) => {
            const { shifts } = user
            myReturn = myReturn.concat(shifts.map(shift => ({ ...shift, full_user: user })))
        })
        return myReturn
    }
}