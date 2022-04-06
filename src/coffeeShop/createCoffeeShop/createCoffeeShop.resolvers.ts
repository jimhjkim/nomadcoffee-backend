import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';
import coffeeShopTypeDefs from '../coffeeShop.typeDefs';
import { handleFile, processCategory } from '../coffeeShop.utils';

const resolvers: Resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, category, file },
        { client, loggedInUser }
      ) => {
        try {
          const shop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              user: {
                connect: {
                  id: loggedInUser.id
                }
              },
              ...(category && {
                categories: {
                  connectOrCreate: processCategory(category)
                }
              })
            }
          });
          if (file) {
            await client.coffeeShopPhoto.create({
              data: {
                url: await handleFile(file, loggedInUser.id),
                shop: {
                  connect: {
                    id: shop.id
                  }
                }
              }
            });
          }
          return {
            ok: true
          };
        } catch (error) {
          return {
            ok: false,
            error
          };
        }
      }
    )
  }
};

export default resolvers;
