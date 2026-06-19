export const followTypeDefs = `#graphql
  type Follow {
    id: String
    userFollowedId: String
    followedByUserId: String
    followedDate: String
  }

  type Mutation {
    startFollow(userFollowedId: String, followedByUserId: String): Boolean
    stopFollow(userFollowedId: String, followedByUserId: String): Boolean
  }
`;
