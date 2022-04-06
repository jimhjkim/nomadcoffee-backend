import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeCategories: (_, { lastId }, { client }) =>
      client.category.findMany({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } })
      })
  }
};
export default resolvers;
