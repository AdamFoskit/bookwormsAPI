
import * as path from 'path';
import { buildSchema } from 'type-graphql';

export const CreateSchema = () => buildSchema({
    resolvers: [__dirname + "/src/**/*.resolver.ts"],
    // eslint-disable-next-line no-undef
    emitSchemaFile: path.resolve(__dirname, '/schema.gql'),
})