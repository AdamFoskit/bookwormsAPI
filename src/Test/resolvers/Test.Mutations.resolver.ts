import { Args, Mutation, Resolver } from 'type-graphql';

import { CreateTestInput } from '../dto/classes/Test.CreateInput';
import { TestMutationService } from '../service/Test.Mutations.service';

@Resolver()
export class TestMutationResolver {
    testMutationService: TestMutationService;
    constructor() {
        this.testMutationService = new TestMutationService();
    }
    @Mutation(() => Boolean)
    async createTest(@Args() input: CreateTestInput): Promise<boolean> {
        return await this.testMutationService.createTest(input);
    }
}
