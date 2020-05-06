import { Field, ObjectType, Root } from 'type-graphql';

import EventDto from '../../EventGenerics/Event.dto';
import UserDto from '../../User/dto/User.dto';
import UserSchema from '../../User/User.schema';

@ObjectType()
export default class PendingShiftDto extends EventDto {
    @Field()
    fromUserID: string;

    @Field(() => UserDto, { nullable: true })
    async full_fromUser(@Root() PendingShiftDto): Promise<UserDto> {
        return await UserSchema.findById(PendingShiftDto.fromUserID).lean()
    }

    @Field()
    toUserID: string;

    @Field(() => UserDto, { nullable: true })
    async full_toUser(@Root() PendingShiftDto): Promise<UserDto> {
        return await UserSchema.findById(PendingShiftDto.toUserID).lean()
    }
}