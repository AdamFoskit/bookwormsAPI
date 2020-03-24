import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class EventDto {
    @Field()
    title: string;

    @Field()
    start: string;

    @Field()
    end: string;

    @Field()
    color: string;
}