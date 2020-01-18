import TestDto from '../dto/Test.dto';
import TestSchema from '../schema/Test.schema';

export class TestQueryService {
    async getTests(): Promise<TestDto[]> {
        return await TestSchema.find({}).lean();
    }
}
