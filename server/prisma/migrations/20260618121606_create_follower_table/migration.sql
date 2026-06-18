-- CreateTable
CREATE TABLE "Follower" (
    "id" UUID NOT NULL,
    "user_followed_id" UUID NOT NULL,
    "followed_by_user_id" UUID NOT NULL,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_user_followed_id_fkey" FOREIGN KEY ("user_followed_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followed_by_user_id_fkey" FOREIGN KEY ("followed_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
