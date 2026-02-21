import { CreatePost } from "./components/create-post";
import { Header } from "./components/header";
import { Post } from "./components/post";

function App() {
  return (
    <div>
      <Header />
      <CreatePost authorName="Michel" />
      <Post />
    </div>
  );
}

export default App;
