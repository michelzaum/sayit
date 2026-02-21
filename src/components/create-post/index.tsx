export function CreatePost() {
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="flex flex-col gap-1">
        <span className="text-2xl">Ola, Michel.</span>
        <span className="text-base text-gray-500">
          O que gostaria de compartilhar hoje?
        </span>
      </div>
      <textarea
        name="postContent"
        id="postContent"
        rows={4}
        className="border border-gray-300 rounded-lg resize-none p-3"
      ></textarea>
      <button className="bg-blue-950 text-gray-50 font-medium py-4 mt-2 rounded-lg">
        Postar
      </button>
    </div>
  );
}
