import { Feed } from "./components/feed";
import { Header } from "./components/header";
import { PostDetails } from "./components/postDetails";

const post = {
  authorImage: "👨️",
  authorName: "John Doe",
  createdAt: new Date(),
  postContent: "Um Post bem legal feito pelo John doe a 1 hora atras.",
  likesCount: 10,
  commentsCount: 2,
  comments: [
    {
      author: "John Doe 3",
      authorImage: "👨️",
      content: "Que post legal!",
      createdAt: new Date(),
    },
  ],
};

function App() {
  return (
    <div>
      <Header />
      <PostDetails {...post} />
    </div>
  );
}

export default App;
