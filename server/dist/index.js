import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
const typeDefs = `#graphql
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
    getUser: User
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
const resolvers = {
    Query: {
        getUser: async () => ({
            name: "michelzaum",
            email: "michel@gmail.com",
            password: "1234",
            createdAt: "2026/02/23",
        }),
        getPosts: () => [],
        getPost: () => { },
    },
    Mutation: {
        createUser: async (_, args) => {
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
