import * as bcrypt from 'bcrypt';
import { createWriteStream } from 'fs';
import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { name, username, email, password: newPassword, avatar },
        { client, loggedInUser }
      ) => {
        let avatarURL = null;
        if (avatar) {
          const {
            file: { filename, createReadStream }
          } = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            `${process.cwd()}/uploads/${newFilename}`
          );
          readStream.pipe(writeStream);
          avatarURL = `http://localhost:4000/static/${newFilename}`;
        }
        let hashedPassword = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id
          },
          data: {
            name,
            username,
            email,
            ...(hashedPassword && { password: hashedPassword }),
            ...(avatarURL && { avatarURL })
          }
        });
        if (updatedUser.id) {
          return {
            ok: true
          };
        }
        return {
          ok: false,
          error: 'Could not update profile.'
        };
      }
    )
  }
};

export default resolvers;
