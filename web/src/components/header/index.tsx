import { Link } from "react-router";
import { useHeader } from "./useHeader";

export function Header() {
  const { handleSignOut } = useHeader();

  return (
    <header className="bg-blue-950 flex items-center justify-between py-10 px-6">
      <Link to="/" className="text-gray-50 font-medium">
        Home
      </Link>
      <button className="text-gray-50 font-medium hover:cursor-pointer" onClick={handleSignOut}>
        Logout
      </button>
    </header>
  );
}
