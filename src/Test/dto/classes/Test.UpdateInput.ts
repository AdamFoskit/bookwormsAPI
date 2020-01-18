import { UpdateAddressDto } from './types/Address.dto';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class UpdateCoachInput {
    @Field(() => UpdateAddressDto, { nullable: true })
    address: UpdateAddressDto;

    @Field({ nullable: true })
    first_name: string;

    @Field({ nullable: true })
    last_name: string;
}
