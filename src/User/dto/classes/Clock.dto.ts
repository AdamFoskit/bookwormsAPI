import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class ClockDto {
    @Field()
    _id: string;

    @Field()
    time: string;

    @Field()
    location: string;
}