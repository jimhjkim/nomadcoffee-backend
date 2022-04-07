// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';
import logger from 'morgan';
import client from './client';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const { PORT } = process.env;

const startApolloServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: async ({ req }) => ({
      loggedInUser: await getUser(req.headers.authorization),
      client
    })
  });

  await server.start();
  app.use(logger('tiny'));
  app.use('/static', express.static('uploads'));
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) => app.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server is running on http://localhost:${PORT}${server.graphqlPath} ✅`
  );
};

startApolloServer();
