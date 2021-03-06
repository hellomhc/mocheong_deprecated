import {ApolloServer} from 'apollo-server-express';
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import schema from './schema';
import {PrismaClient} from '.prisma/client';

(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const prisma = new PrismaClient();
  const server = new ApolloServer({
    schema,
    context: ({req, res}) => {
      return {
        req,
        res,
        prisma,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
  });

  await server.start();
  server.applyMiddleware({
    app,
    cors: true,
    path: '/api/v1/graphql',
  });
  httpServer.listen({port: 4000}, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    );
  });
})();
