import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import logger from 'morgan';
import { getUser } from './users/users.utils';
import { typeDefs, resolvers } from './schema';

require('dotenv').config();

const { PORT } = process.env;

const startApolloServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({
      loggedInUser: await getUser(req.headers.authorization),
    }),
  });

  await server.start();
  app.use(logger('tiny'));
  app.use('/static', express.static('uploads'));
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server is running on http://localhost:${PORT}${server.graphqlPath} ✅`,
  );
};

startApolloServer();
