import { ArgsType, Field, InputType } from 'type-graphql';

import EventInputDto from '../../EventGenerics/Event.Mutate.dto';

@ArgsType()
@InputType('UpdateUserInput')
export default class UpdateUserDto {
    @Field()
    _id: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    firstName: string;

    @Field({ nullable: true })
    lastName: string;

    @Field({ nullable: true })
    userType: string;

    @Field(() => [EventInputDto], { nullable: true })
    shifts: EventInputDto[];

    @Field(() => [EventInputDto], { nullable: true })
    preferences: EventInputDto[];

    @Field(() => [String], { nullable: true })
    availableShifts: string[]
}