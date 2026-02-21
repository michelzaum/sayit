import { CreatePostProps } from "./types";

export function CreatePost({ authorName }: CreatePostProps) {
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="flex flex-col gap-1">
        <span className="text-2xl">Ola, {authorName}.</span>
        <span className="text-base text-gray-500">
          O que gostaria de compartilhar hoje?
        </span>
      </div>
      <form className="flex flex-col gap-6">
        <textarea
          name="postContent"
          id="postContent"
          rows={4}
          className="border border-gray-300 rounded-lg resize-none p-3"
        ></textarea>
        <button
          type="button"
          className="bg-blue-950 text-gray-50 font-medium py-4 rounded-lg hover:bg-blue-900 transition-colors cursor-pointer"
        >
          Postar
        </button>
      </form>
    </div>
  );
}
