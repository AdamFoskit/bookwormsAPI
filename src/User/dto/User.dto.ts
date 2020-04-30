import { Field, ObjectType } from 'type-graphql';

import EventDto from '../../EventGenerics/Event.dto';
import ClockDto from './classes/Clock.dto';

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

    @Field({ nullable: true })
    color: string;

    @Field(() => [EventDto])
    shifts: EventDto[];

    @Field(() => [EventDto])
    preferences: EventDto[];

    @Field(() => [ClockDto], { defaultValue: [] })
    clockIns: ClockDto[]

    @Field(() => [ClockDto], { defaultValue: [] })
    clockOuts: ClockDto[]
}