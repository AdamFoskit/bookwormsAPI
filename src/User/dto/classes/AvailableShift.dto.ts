import { Field, ObjectType } from 'type-graphql';

import EventDto from '../../../EventGenerics/Event.dto';
import UserDto from '../User.dto';

@ObjectType()
export default class AvailableShiftDto extends EventDto {
    @Field(() => UserDto)
    full_user: UserDto;
}