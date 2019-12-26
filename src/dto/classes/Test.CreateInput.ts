import { AddressDto } from "./types/Address.dto";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreateTestInput {
    @Field(() => AddressDto)
    address: AddressDto;

    @Field()
    first_name: string;

    @Field()
    last_name: string;
}
