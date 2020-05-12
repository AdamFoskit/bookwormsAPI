import { graphql } from 'graphql';
import Maybe from 'graphql/tsutils/Maybe';

import { CreateSchema } from '../../CreateSchema';

interface Options {
    source: string;
    variableValues?: Maybe<{ [key: string]: any }>
}
let schema
export const gCall = async ({ source, variableValues }: Options) => {
    if (!schema) {
        schema = await CreateSchema()
    }
    return graphql({
        schema: await CreateSchema(),
        source,
        variableValues
    })
}