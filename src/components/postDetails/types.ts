export type PostProps = {
  authorName: string;
  authorImage: string;
  createdAt: Date;
  postContent: string;
  likesCount: number;
  commentsCount: number;
  comments: Comment[];
};

type Comment = {
  author: string;
  authorImage: string;
  content: string;
  createdAt: Date;
};
