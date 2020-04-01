import { ArgsType, Field, InputType } from 'type-graphql';

@ArgsType()
@InputType('CreateBlackoutInput')
export default class CreateBlackout {
    @Field()
    start: string;

    @Field()
    end: string;
}