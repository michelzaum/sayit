import { CreatePost } from "./components/create-post";
import { Header } from "./components/header";
import { Post } from "./components/post";

function App() {
  return (
    <div>
      <Header />
      <CreatePost authorName="Michel" />
      <Post
        authorImage="👨️"
        authorName="John Doe"
        createdAt={new Date()}
        postContent="Um Post bem legal feito pelo John doe a 1 hora atras."
        likesCount={8}
        commentsCount={2}
      />
    </div>
  );
}

export default App;
