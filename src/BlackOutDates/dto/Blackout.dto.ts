import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class BlackoutDto {
    @Field()
    _id: string;

    @Field()
    start: string;

    @Field()
    end: string;
}