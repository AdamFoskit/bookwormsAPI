import { Field, ObjectType, Root } from 'type-graphql';

import EventDto from '../../EventGenerics/Event.dto';
import UserDto from '../../User/dto/User.dto';
import UserSchema from '../../User/User.schema';

@ObjectType()
export default class AvailableShiftDto {
    @Field()
    _id: string;

    @Field()
    user_id: string;

    @Field(() => EventDto)
    shift: EventDto;

    @Field(() => UserDto, { nullable: true })
    async full_user(@Root() shift: AvailableShiftDto): Promise<UserDto> {
        return UserSchema.findById(shift.user_id).lean();
    }
}