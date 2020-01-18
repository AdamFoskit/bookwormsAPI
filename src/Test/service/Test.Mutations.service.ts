import { CreateTestInput } from '../dto/classes/Test.CreateInput';
import TestSchema from '../schema/Test.schema';

export class TestMutationService {
    async createTest(input: CreateTestInput): Promise<boolean> {
        const created = await TestSchema.create(input);
        if (!created) throw new Error('Error creating Test');
        return true;
    }
}
