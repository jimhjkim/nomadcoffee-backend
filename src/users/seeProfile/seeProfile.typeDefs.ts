import { gql } from 'apollo-server';

export default gql`
  type Query {
    seeProfile(username: String!): User
    seeFollowers(username: String!, page: Int!): SeeFollowersResult!
    seeFollowing(username: String!, lastId: Int): SeeFollowingResult!
  }
  type SeeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
  }
`;
