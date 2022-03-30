import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    createdAt: String!
    updatedAt: String!
    name: String!
    username: String!
    email: String!
    location: String
    avatarURL: String
    githubUsername: String
  }
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      name: String!
      username: String!
      email: String!
      password: String!
    ): CreateAccountResult
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
