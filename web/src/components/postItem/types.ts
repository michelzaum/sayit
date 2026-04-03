export type PostProps = {
  id: string;
  authorName: string;
  authorImage: string;
  createdAt: Date;
  postContent: string;
  likesCount: number;
  commentsCount: number;
  isPostLiked: boolean;
};
