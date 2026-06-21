import { IncomingMessage, ServerResponse } from "http";

import { SignInUseCase } from "@/modules/auth/sign-in/useCases/SignInUseCase";
import { CreateUserUseCase } from "@/modules/user/useCases/createUser/CreateUserUseCase";
import { GetLoggedUserUseCase } from "@/modules/user/useCases/getLoggedUser/GetLoggedUserUseCase";

import { CreatePostUseCase } from "@/modules/post/useCases/createPost/CreatePostUseCase";
import { ListPostsUseCase } from "@/modules/post/useCases/listPosts/ListPostsUseCase";
import { DeletePostUseCase } from "@/modules/post/useCases/deletePost/DeletePostUseCase";
import { UpdatePostUseCase } from "@/modules/post/useCases/updatePost/UpdatePostUseCase";
import { GetPostUseCase } from "@/modules/post/useCases/getPost/GetPostUseCase";

import { CreateCommentUseCase } from "@/modules/comments/useCases/createComment/CreateCommentUseCase";
import { UpdateCommentUseCase } from "@/modules/comments/useCases/updateComment/UpdateCommentUseCase";
import { DeleteCommentUseCase } from "@/modules/comments/useCases/deleteComment/DeleteCommentUseCase";
import { GetAllCommentsByPostIdUseCase } from "@/modules/comments/useCases/getAllCommentsByPostId/GetAllCommentsByPostIdUseCase";

import { CreateLikeUseCase } from "@/modules/like/useCases/CreateLikeUseCase";
import { DeleteLikeUseCase } from "@/modules/like/useCases/DeleteLikeUseCase";
import { PostLikesByAuthorIdUseCase } from "@/modules/like/useCases/PostLikesByAuthorIdUseCase";
import { GetAllPostsByAuthorIdUseCase } from "@/modules/post/useCases/getAllPostsByAuthorId/GetAllPostsByAuthorId";
import { GetUserProfileInfoUseCase } from "@/modules/user/useCases/getUserProfileInfo/GetUserProfileInfoUseCase";
import { UpdateUserUseCase } from "@/modules/user/useCases/updateUser/UpdateUserUseCase";
import { StartFollowingUseCase } from "@/modules/follower/useCases/startFollowingUseCase";
import { StopFollowingUseCase } from "@/modules/follower/useCases/stopFollowingUseCase";
import { IsLoggedUserFollowingUserProfileIdUseCase } from "@/modules/follower/useCases/isLoggedUserFollowingUserProdileIdUseCase";

interface IHttp {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
}

export interface IContainer {
  authenticatedUser: {
    id: string;
  };
  http: IHttp;
  createUserUseCase: CreateUserUseCase;
  getUserUseCase: GetLoggedUserUseCase;
  signInUseCase: SignInUseCase;
  createPostUseCase: CreatePostUseCase;
  listPostsUseCase: ListPostsUseCase;
  deletePostUseCase: DeletePostUseCase;
  updatePostUseCase: UpdatePostUseCase;
  getPostUseCase: GetPostUseCase;
  createCommentUseCase: CreateCommentUseCase;
  updateCommentUseCase: UpdateCommentUseCase;
  deleteCommentUseCase: DeleteCommentUseCase;
  createLikeUseCase: CreateLikeUseCase;
  deleteLikeUseCase: DeleteLikeUseCase;
  getPostLikesByAuthorIdUseCase: PostLikesByAuthorIdUseCase;
  getAllCommentsByPostIdUseCase: GetAllCommentsByPostIdUseCase;
  getAllPostsByAuthorIdUseCase: GetAllPostsByAuthorIdUseCase;
  getUserProfileInfoUseCase: GetUserProfileInfoUseCase;
  updateUserUseCase: UpdateUserUseCase;
  startFollowingUseCase: StartFollowingUseCase;
  stopFollowingUseCase: StopFollowingUseCase;
  isLoggedUserFollowingUserProfileIdUseCase: IsLoggedUserFollowingUserProfileIdUseCase;
}
