import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';

import { CreateSchema } from './CreateSchema';

require('dotenv').config();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const main = async () => {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGODB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        poolSize: 20,
    });
    const schema = await CreateSchema()

    const apolloServer = new ApolloServer({ schema, playground: true, introspection: true });

    const app = Express();
    app.use(helmet());
    apolloServer.applyMiddleware({ app });

    app.listen(process.env.PORT || 7000, () => {
        console.log('server started on http://localhost:7000/graphql');
    });
};

main();
