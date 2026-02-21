export function Post() {
  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>👨️</div>
          <span className="text-xs font-medium">John Doe</span>
        </div>
        <span>👍️</span>
      </div>
      <span className="text-[10px] text-gray-500">1 horas atras</span>
      <div className="py-4">
        <span className="text-xs font-medium">
          Um Post bem legal feito pelo John doe a 1 hora atras.
        </span>
      </div>

      <div className="h-px w-full bg-gray-300"></div>

      <div className="flex items-center gap-2 py-4">
        <div className="flex items-center gap-1">
          <span>👍️</span>
          <span>8</span>
        </div>
        <div className="flex items-center gap-1">
          <span>💬️</span>
          <span>8</span>
        </div>
      </div>

      <form className="flex flex-col items-end gap-3">
        <textarea
          name="comment"
          id="comment"
          placeholder="Escreva um comentario"
          className="border border-gray-300 text-xs rounded-lg p-3 w-full resize-none"
        ></textarea>
        <button
          type="button"
          className="text-xs font-medium bg-blue-950 text-white p-3 rounded-lg"
        >
          Comentar
        </button>
      </form>
    </div>
  );
}
