import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import { buildSchema } from 'type-graphql';

import { TestMutationResolver } from './src/Test/resolvers/Test.Mutations.resolver';
import { TestQueryResolver } from './src/Test/resolvers/Test.Queries.resolver';

require('dotenv').config();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const main = async () => {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGODB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 20,
    });
    const schema = await buildSchema({
        resolvers: [TestQueryResolver, TestMutationResolver],
        // eslint-disable-next-line no-undef
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    });

    const apolloServer = new ApolloServer({ schema, playground: true, introspection: true });

    const app = Express();

    apolloServer.applyMiddleware({ app });

    app.listen(process.env.PORT || 4000, () => {
        console.log('server started on http://localhost:4000/graphql');
    });
};

main();
