import { FollowButton } from "./FollowButton";
import { UnFollowButton } from "./UnfollowButton";

interface FollowProps {
  isLoggedUserFollowing: boolean;
  handleFollowUser: () => void;
  handleUnFollowUser: () => void;
}

export function Follow({ isLoggedUserFollowing, handleFollowUser, handleUnFollowUser }: FollowProps) {
  if (isLoggedUserFollowing) {
    return (
      <UnFollowButton handleUnFollowUser={handleUnFollowUser} />
    )
  }
  return (
    <FollowButton handleFollowUser={handleFollowUser} />
  )
}
