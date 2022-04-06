import { Resolvers } from '../../types';

const PAGE_SIZE = 5;

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, lastId }, { client }) =>
      client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase()
          }
        },
        take: PAGE_SIZE,
        skip: 1,
        ...(lastId && { cursor: { id: lastId } })
      })
  }
};

export default resolvers;
