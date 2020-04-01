import { Field, ObjectType } from 'type-graphql';

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
}