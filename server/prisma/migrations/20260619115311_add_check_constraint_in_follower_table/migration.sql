ALTER TABLE "Follower"
ADD CONSTRAINT "self_follow_check"
CHECK ("user_followed_id" <> "followed_by_user_id");
