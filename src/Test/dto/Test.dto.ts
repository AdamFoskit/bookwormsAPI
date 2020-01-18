import { ObjectType, Field, ArgsType } from 'type-graphql';
import { AddressDto } from './classes/types/Address.dto';

@ObjectType()
@ArgsType()
export default class TestDto {
    @Field()
    _id: string;

    @Field(() => AddressDto)
    address: AddressDto;

    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field(() => [String])
    teams: string[];

    @Field(() => [String])
    favorites: string[];
}
