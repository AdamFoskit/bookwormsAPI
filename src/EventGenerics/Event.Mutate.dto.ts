import { Field, InputType } from 'type-graphql';

@InputType('UpdateEventInput')
export default class EventInputDto {
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
}