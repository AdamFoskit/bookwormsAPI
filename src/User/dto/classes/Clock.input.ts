import { Field, InputType } from 'type-graphql';

@InputType()
export default class ClockInputDto {
    @Field()
    time: string;

    @Field()
    location: string;
}