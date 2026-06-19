export const followTypeDefs = `#graphql
  type Follow {
    id: String
    userFollowedId: String
    followedByUserId: String
    followedDate: String
  }

  type Mutation {
    startFollowing(userFollowedId: String): Follow
    stopFollowing(userFollowedId: String): Boolean
  }
`;
