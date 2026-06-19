export const followTypeDefs = `#graphql
  type Follow {
    id: String
    userFollowedId: String
    followedByUserId: String
    followedDate: String
  }

  type Mutation {
    startFollowing(userFollowedId: String, followedByUserId: String): Follow
    stopFollowing(userFollowedId: String, followedByUserId: String): Boolean
  }
`;
