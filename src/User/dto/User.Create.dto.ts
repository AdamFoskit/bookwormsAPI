import { ArgsType, Field, InputType } from 'type-graphql';

@ArgsType()
@InputType('CreateUserInput')
export default class CreateUserDto {
    @Field()
    firebaseID: string;

    @Field()
    email: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    userType: string;
}