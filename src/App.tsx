import { CreatePost } from "./components/create-post";
import { Header } from "./components/header";

function App() {
  return (
    <div>
      <Header />
      <CreatePost authorName="Michel" />
    </div>
  );
}

export default App;
