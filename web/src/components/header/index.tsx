import { Link } from "react-router";
import { useHeader } from "./useHeader";

export function Header() {
  const { loggedUserId, handleSignOut } = useHeader();

  return (
    <header className="bg-blue-950 flex items-center justify-between py-10 px-6">
      <Link to="/" className="text-gray-50 font-medium">
        Home
      </Link>

      <div className="flex items-center gap-6">
        <Link to={`/profile/${loggedUserId}`} className="text-gray-50 font-medium hover:cursor-pointer">
          Perfil
        </Link>
        <button className="text-gray-50 font-medium hover:cursor-pointer" onClick={handleSignOut}>
          Logout
        </button>
      </div>
    </header>
  );
}
