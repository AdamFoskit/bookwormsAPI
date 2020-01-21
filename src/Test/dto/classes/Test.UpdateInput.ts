import { ArgsType, Field } from 'type-graphql';

import { UpdateAddressDto } from './types/Address.dto';

@ArgsType()
export class UpdateTestInput {
    @Field()
    _id: string;

    @Field(() => UpdateAddressDto, { nullable: true })
    address: UpdateAddressDto;

    @Field({ nullable: true })
    first_name: string;

    @Field({ nullable: true })
    last_name: string;
}
