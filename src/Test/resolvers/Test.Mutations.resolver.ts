import { Args, Mutation, Resolver } from 'type-graphql';

import { CreateTestInput } from '../dto/classes/Test.CreateInput';
import { UpdateTestInput } from '../dto/classes/Test.UpdateInput';
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

    @Mutation(() => Boolean)
    async updateTest(@Args() input: UpdateTestInput): Promise<boolean> {
        return await this.testMutationService.updateTest(input);
    }
}
