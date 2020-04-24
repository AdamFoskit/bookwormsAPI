import { ArgsType, Field, InputType } from 'type-graphql';

import EventInputDto from '../../EventGenerics/Event.Mutate.dto';

@ArgsType()
@InputType('CreateAvailableShiftInput')
export default class CreateAvailableShift {
    @Field()
    user_id: string;

    @Field(() => EventInputDto)
    shift: EventInputDto;
}