import { Routes, Route } from "react-router";

import { Feed } from "./pages/feed";
import { PostDetails } from "./pages/postDetails";

export function RoutesComponent() {
  return (
    <Routes>
      <Route index element={<Feed />} />
      <Route path="/postDetails" element={<PostDetails />} />
    </Routes>
  );
}
