import { Field, ObjectType, Root } from 'type-graphql';

import AvailableShiftsSchema from '../../AvailableShifts/AvailableShifts.schema';
import AvailableShiftDto from '../../AvailableShifts/dto/AvailableShifts.dto';
import EventDto from '../../EventGenerics/Event.dto';

@ObjectType()
export default class UserDto {
    @Field()
    _id: string;

    @Field()
    firebaseID: string;

    @Field()
    email: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    userType: string;

    @Field(() => [EventDto])
    shifts: EventDto[];

    @Field(() => [EventDto])
    preferences: EventDto[];

    @Field(() => [String])
    availableShifts: string[]

    @Field(() => [AvailableShiftDto])
    async full_availableShifts(@Root() user: UserDto): Promise<AvailableShiftDto[]> {
        return await AvailableShiftsSchema.find({ _id: { $in: user.availableShifts } }).lean()
    }
}