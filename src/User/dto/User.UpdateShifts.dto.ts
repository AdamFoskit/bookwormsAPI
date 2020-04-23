import { ArgsType, Field, InputType } from 'type-graphql';

import EventInputDto from '../../EventGenerics/Event.Mutate.dto';

@ArgsType()
@InputType()
class UpdateUserShift {
    @Field()
    _id: string;

    @Field(() => [EventInputDto], { nullable: true })
    shifts: EventInputDto[];
}

@ArgsType()
@InputType()
export default class UpdateUserShiftsDto {
    @Field(() => [UpdateUserShift])
    users: UpdateUserShift[]
}


