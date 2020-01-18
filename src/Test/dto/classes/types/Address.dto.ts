import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('CreateAddressInput')
export class AddressDto {
    @Field()
    state: string;

    @Field()
    city: string;

    @Field()
    zip: number;

    @Field()
    street: string;
}

@ObjectType()
@InputType('UpdateAddressDtoInput')
export class UpdateAddressDto {
    @Field({ nullable: true })
    state: string;

    @Field({ nullable: true })
    city: string;

    @Field({ nullable: true })
    zip: number;

    @Field({ nullable: true })
    street: string;
}
