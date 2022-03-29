import client from "../client";

export default {
  Mutation: {
    createCoffee: (_, { name, origin, year }) =>
      client.coffee.create({
        data: {
          name,
          origin,
          year,
        },
      }),
    deleteCoffee: (_, { id }) => client.coffee.delete({ where: { id } }),
    updateCoffee: (_, { id, year }) =>
      client.coffee.update({ where: { id }, data: { year } }),
  },
};
