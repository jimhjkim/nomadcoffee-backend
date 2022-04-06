import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';
import { handleFile, processCategory } from '../coffeeShop.utils';

const resolvers: Resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, file, category },
        { client, loggedInUser }
      ) => {
        const shop = await client.coffeeShop.findUnique({
          where: {
            id
          },
          include: {
            categories: {
              select: {
                id: true
              }
            }
          }
        });

        if (!shop) {
          return {
            ok: false,
            error: 'Cannot find coffee shop.'
          };
        }

        try {
          await client.coffeeShop.update({
            where: {
              id
            },
            data: {
              name,
              latitude,
              longitude,
              ...(category && {
                categories: {
                  disconnect: shop.categories,
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
                    id
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
