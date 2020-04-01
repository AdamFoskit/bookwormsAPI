import { ArgsType, Field, InputType } from 'type-graphql';

@ArgsType()
@InputType('UpdateBlackoutDtoInput')
export default class UpdateBlackoutDto {
    @Field()
    _id: string;

    @Field({ nullable: true })
    start: string;

    @Field({ nullable: true })
    end: string;
}