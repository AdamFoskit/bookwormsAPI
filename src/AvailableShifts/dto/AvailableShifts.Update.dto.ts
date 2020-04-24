import { ArgsType, Field, InputType } from 'type-graphql';

import EventInputDto from '../../EventGenerics/Event.Mutate.dto';

@ArgsType()
@InputType('UpdateAvailableShiftDtoInput')
export default class UpdateAvailableShiftDto {
    @Field()
    _id: string;

    @Field()
    user_id: string;

    @Field(() => EventInputDto)
    shift: EventInputDto;
}