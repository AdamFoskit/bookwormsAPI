import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import * as bodyparser from 'body-parser';
import * as Express from 'express';
import * as admin from 'firebase-admin';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as path from 'path';
import { buildSchema } from 'type-graphql';

require('dotenv').config();

export const fb = admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG))
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const main = async () => {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGODB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        poolSize: 20,

    });
    const schema = await buildSchema({
        resolvers: [__dirname + "/src/**/*.resolver.ts"],
        // eslint-disable-next-line no-undef
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),

    });

    const apolloServer = new ApolloServer({ schema, playground: true, introspection: true, });

    const app = Express();
    app.use(helmet());
    app.use(bodyparser.json({ limit: '1mb' }));
    apolloServer.applyMiddleware({ app });

    app.listen(process.env.PORT || 7000, () => {
        console.log('server started on http://localhost:7000/graphql');
        // console.dir(ip.address());
    });
};

main();
