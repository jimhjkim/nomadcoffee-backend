import * as bcrypt from 'bcrypt';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { name, username, email, password },
      { client }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username
              },
              {
                email
              }
            ]
          }
        });
        if (existingUser) {
          throw new Error('The username and/or email is already taken.');
        }
        const hashedPwd = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            name,
            username,
            email,
            password: hashedPwd
          }
        });
        return {
          ok: true
        };
      } catch (e) {
        return {
          ok: false,
          error: 'Cannot create account.'
        };
      }
    }
  }
};

export default resolvers;
