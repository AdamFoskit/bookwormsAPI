import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class EventDto {
    @Field()
    _id: string;

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

    @Field()
    available: boolean;
}