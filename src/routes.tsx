import { Routes, Route } from "react-router";

import { Feed } from "./pages/feed";
import { PostDetails } from "./pages/postDetails";
import { SignIn } from "./pages/sign-in";

export function RoutesComponent() {
  return (
    <Routes>
      <Route index element={<Feed />} />
      <Route path="/postDetails" element={<PostDetails />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
}
