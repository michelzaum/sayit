import { Link } from "react-router";

export function Header() {
  return (
    <header className="bg-blue-950 flex items-center justify-between py-10 px-6">
      <Link to="/" className="text-gray-50 font-medium">
        Home
      </Link>
      <span className="text-gray-50 font-medium">Logout</span>
    </header>
  );
}
