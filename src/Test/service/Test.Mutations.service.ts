import { CreateTestInput } from '../dto/classes/Test.CreateInput';
import { UpdateTestInput } from '../dto/classes/Test.UpdateInput';
import TestSchema from '../schema/Test.schema';

export class TestMutationService {
    async createTest(input: CreateTestInput): Promise<boolean> {
        const created = await TestSchema.create(input);
        if (!created) throw new Error('Error creating Test');
        return true;
    }

    async updateTest(input: UpdateTestInput): Promise<boolean> {
        const foundDoc = await TestSchema.findByIdAndUpdate(input._id, { $set: input });
        if (!foundDoc) throw new Error('Unable to find a team with that ID');
        return true;
    }
}
