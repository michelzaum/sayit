import { CheckCheck } from "lucide-react";

interface UnFollowButtonProps {
  handleUnFollowUser: () => void;
}

export function UnFollowButton({ handleUnFollowUser }: UnFollowButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-4 py-4 px-6 border rounded-md hover:cursor-pointer hover:bg-gray-50 transition-all"
      onClick={handleUnFollowUser}
    >
      <span>Seguindo</span>
      <CheckCheck />
    </button>
  );
}
