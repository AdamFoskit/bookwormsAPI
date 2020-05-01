import { ArgsType, Field, InputType } from 'type-graphql';



@InputType()
class EventWithoutIDInput {
    @Field()
    title: string;

    @Field()
    start: string;

    @Field()
    end: string;

    @Field()
    color: string;

    @Field({ nullable: true })
    value: string;

    @Field({ defaultValue: false })
    available: boolean;
}

@ArgsType()
@InputType()
class UpdateUserShift {
    @Field()
    _id: string;

    @Field(() => [EventWithoutIDInput], { nullable: true })
    shifts: EventWithoutIDInput[];
}

@ArgsType()
@InputType()
export default class UpdateUserShiftsDto {
    @Field(() => [UpdateUserShift])
    users: UpdateUserShift[]
}


