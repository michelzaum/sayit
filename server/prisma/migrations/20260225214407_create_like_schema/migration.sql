-- CreateTable
CREATE TABLE "Like" (
    "author_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("author_id","post_id")
);
