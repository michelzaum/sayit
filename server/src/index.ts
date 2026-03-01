interface CreateUserArgs {
  body: {
    email: string;
    password: string;
    name: string;
  };
}

export const typeDefs = `#graphql
  type User {
    name: String
    email: String
    password: String
    createdAt: String
  }

  type Post {
    content: String
    author: User
    likes: [Like!]
    comments: [Comment!]
    createdAt: String
  }

  type Like {
    authorId: String
    createdAt: String
  }

  type Comment {
    body: String
    authorId: String
    createdAt: String
  }

  type Query {
    getUser(id: String): User
    getPosts: [Post!]
    getPost: Post
  }

  input UserInput {
    name: String
    email: String
    password: String
  }

  input PostInput {
    content: String
    author: String
  }

  interface IResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type MutationResponse implements IResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type Mutation {
    createUser(body: UserInput!): MutationResponse
    updateUser(id: String, body: UserInput): MutationResponse
    createPost(body: PostInput!): Post
    updatePost(id: String, body: PostInput): Post
  }
`;

export const resolvers = {
  Query: {
    getUser: async (_, args, { getUserUseCase }) => {
      const userId = args.id;
      return await getUserUseCase.execute(userId);
    },
    getPosts: () => [],
    getPost: () => {},
  },
  Mutation: {
    createUser: async (_, args: CreateUserArgs, { createUserUseCase }) => {
      return await createUserUseCase.execute(args.body);
    },
  },
};
