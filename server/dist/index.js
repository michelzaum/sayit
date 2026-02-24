import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
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
`;
const resolvers = {
    Query: {
        getUser: async () => ({
            userName: "michelzaum",
            email: "michel@gmail.com",
            password: "1234",
            createdAt: "hoy",
        }),
        getPosts: () => [],
        getPost: () => { },
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
