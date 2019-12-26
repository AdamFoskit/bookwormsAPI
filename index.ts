// eslint-disable-next-line prettier/prettier
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import * as mongoose from "mongoose";
import * as path from "path";

require("dotenv").config();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const main = async () => {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGODB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const schema = await buildSchema({
        resolvers: [],
        // eslint-disable-next-line no-undef
        emitSchemaFile: path.resolve(__dirname, "schema.gql")
    });

    const apolloServer = new ApolloServer({ schema, playground: true });

    const app = Express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("server started on http://localhost:4000/graphql");
    });
};

main();
