import { Query, Resolver } from 'type-graphql';

import TestDto from '../dto/Test.dto';
import { TestQueryService } from '../service/Test.Queries.service';

@Resolver()
export class TestQueryResolver {
    testQueryService: TestQueryService;
    constructor() {
        this.testQueryService = new TestQueryService();
    }
    @Query(() => [TestDto])
    async getTests(): Promise<TestDto[]> {
        return this.testQueryService.getTests();
    }
}
