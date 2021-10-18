import {join} from 'path';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {loadFilesSync} from '@graphql-tools/load-files';
import {mergeResolvers, mergeTypeDefs} from '@graphql-tools/merge';

// https://github.com/nareshbhatia/graphql-bookstore/blob/master/apollo-bookstore-server/src/graphql/typedefs.ts
const typeDefsArray = loadFilesSync(join(__dirname, '**/*.graphql'));
const typeDefs = mergeTypeDefs(typeDefsArray);

// https://github.com/nareshbhatia/graphql-bookstore/blob/master/apollo-bookstore-server/src/graphql/resolvers.ts
const resolversArray = loadFilesSync(join(__dirname, '**/*.resolvers.ts'));
const resolvers = mergeResolvers(resolversArray);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
  inheritResolversFromInterfaces: true,
});
