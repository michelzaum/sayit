export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  postId: string;
  author: {
    id: string;
    name: string;
  };
};
