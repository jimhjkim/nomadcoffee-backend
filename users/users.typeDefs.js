import { gql } from 'apollo-server';

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
`;
