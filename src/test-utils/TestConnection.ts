import 'reflect-metadata';

import { connect, Mongoose } from 'mongoose';

require('dotenv').config();

export const testConn = async (): Promise<Mongoose> => {
    // eslint-disable-next-line no-undef
    return await connect(process.env.MONGODB_TEST_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        poolSize: 20,
    });
};
