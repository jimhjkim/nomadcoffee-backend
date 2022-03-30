import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (_, { name, username, email, password }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("The username and/or email is already taken.");
        }
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = await client.user.create({
          data: {
            name,
            username,
            email,
            password: hashedPwd,
          },
        });
        if (newUser) {
          return {
            ok: true,
          };
        }
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: e,
        };
      }
    },
  },
};
