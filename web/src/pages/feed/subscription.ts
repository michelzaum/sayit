import { gql } from "@apollo/client";

export const POST_CREATED_SUBSCRIPTION = gql`
  subscription PostCreated {
    postCreated {
      id
      content
      createdAt
      likes {
        authorId
      }
      comments {
        authorId
        postId
      }
      author {
        name
        email
      }
    }
  }
`;
