import { CreatePostProps } from "./types";
import { useCreatePost } from "./useCreatePost";

export function CreatePost({ authorName }: CreatePostProps) {
  const { postContentRef, onCreatePostSubmit } = useCreatePost();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-2xl">Ola, {authorName}.</span>
        <span className="text-base text-gray-500">
          O que gostaria de compartilhar hoje?
        </span>
      </div>
      <form className="flex flex-col gap-6" onSubmit={onCreatePostSubmit}>
        <textarea
          name="postContent"
          id="postContent"
          rows={4}
          className="border border-gray-300 rounded-lg resize-none p-3"
          ref={postContentRef}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-950 text-gray-50 font-medium py-4 rounded-lg hover:bg-blue-900 transition-colors cursor-pointer"
        >
          Postar
        </button>
      </form>
    </div>
  );
}
