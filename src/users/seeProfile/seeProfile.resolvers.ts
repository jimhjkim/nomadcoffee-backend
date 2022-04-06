import { Resolvers } from '../../types';

const PAGE_SIZE = 5;

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { username }, { client }) =>
      client.user.findUnique({
        where: {
          username
        },
        include: {
          following: true,
          followers: true
        }
      }),
    seeFollowers: async (_, { username, page }, { client }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true }
      });
      if (!ok) {
        return {
          ok: false,
          error: 'User not found.'
        };
      }
      const followers = await client.user
        .findUnique({
          where: { username }
        })
        .followers({
          take: PAGE_SIZE,
          skip: (page - 1) * PAGE_SIZE
        });
      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } }
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / PAGE_SIZE)
      };
    },
    seeFollowing: async (_, { username, lastId }, { client }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true }
      });
      if (!ok) {
        return {
          ok: false,
          error: 'User not found.'
        };
      }
      const following = await client.user
        .findUnique({
          where: { username }
        })
        .following({
          take: PAGE_SIZE,
          skip: 1,
          ...(lastId && { cursor: { id: lastId } })
        });
      return {
        ok: true,
        following
      };
    }
  }
};

export default resolvers;
