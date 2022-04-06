import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Category: {
    totalShops: ({ id }, _, { client }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id
            }
          }
        }
      }),
    shops: ({ id }, { lastId }, { client }) =>
      client.category
        .findUnique({
          where: {
            id
          }
        })
        .shops({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } })
        })
  }
};

export default resolvers;
