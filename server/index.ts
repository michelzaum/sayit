import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

interface CreateUserArgs {
  body: {
    email: string;
    password: string;
    username: string;
  };
}

const typeDefs = `#graphql
  type User {
    userName: String
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
    userName: String
    createdAt: String
  }

  type Comment {
    body: String
    userName: String
    createdAt: String
  }

  type Query {
    getUser: User
    getPosts: [Post!]
    getPost: Post
  }

  input UserInput {
    userName: String
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

const resolvers = {
  Query: {
    getUser: async () => ({
      userName: "michelzaum",
      email: "michel@gmail.com",
      password: "1234",
      createdAt: "2026/02/23",
    }),
    getPosts: () => [],
    getPost: () => {},
  },
  Mutation: {
    createUser: async (_, args: CreateUserArgs) => {
      console.log(args.body);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`Server ready at: ${url}`);
