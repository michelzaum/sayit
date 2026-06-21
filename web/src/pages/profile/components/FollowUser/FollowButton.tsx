import { UserPlus } from "lucide-react";

interface FollowButtonProps {
  handleFollowUser: () => void;
}

export function FollowButton({ handleFollowUser }: FollowButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-4 py-4 px-6 border rounded-md hover:cursor-pointer hover:bg-gray-50 transition-all"
      onClick={handleFollowUser}
    >
      <span>
        Seguir
      </span>
      <UserPlus />
    </button>
  )
}
