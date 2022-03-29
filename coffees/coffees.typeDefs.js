import { gql } from "apollo-server";

export default gql`
  type Coffee {
    id: Int!
    createdAt: String!
    updatedAt: String!
    name: String!
    origin: String
    year: Int!
  }
  type Query {
    coffees: [Coffee]
    coffee(id: Int!): Coffee
  }
  type Mutation {
    createCoffee(name: String!, origin: String, year: Int!): Coffee
    deleteCoffee(id: Int!): Coffee
    updateCoffee(id: Int!, year: Int!): Coffee
  }
`;
