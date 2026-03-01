import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { UserRepository } from "./modules/user/repositories/UserRepository";
import { CreateuserUseCase } from "./modules/user/useCases/createUser/CreateUserUseCase";
import { container } from "./main/container";

interface CreateUserArgs {
  body: {
    email: string;
    password: string;
    name: string;
  };
}

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

const resolvers = {
  Query: {
    getUser: async (_, args, { getUserUseCase }) => {
      const userId = args.id;
      return await getUserUseCase.execute(userId);
    },
    getPosts: () => [],
    getPost: () => {},
  },
  Mutation: {
    createUser: async (_, args: CreateUserArgs) => {
      const userRepository = new UserRepository();
      const createUserUseCase = new CreateuserUseCase(userRepository);

      return await createUserUseCase.execute(args.body);
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
  context: async () => ({
    createUserUseCase: container.createUserUseCase,
    getUserUseCase: container.getUserUseCase,
  }),
});

console.log(`Server ready at: ${url}`);
