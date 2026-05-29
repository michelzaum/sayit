import { Loader } from "lucide-react";
import { useUpdateProfile } from "./useUpdateProfile"

export function UpdateProfile() {
  const {
    nameRef,
    bioRef,
    passwordRef,
    isPasswordVisible,
    loading,
    loadingUserInfo,
    onUpdateProfileSubmit,
    toggleShowHidePassword,
  } = useUpdateProfile();

  if (loadingUserInfo) {
    return;
  }

  return (
    <div className="flex justify-center p-6 gap-10 mt-10">
      <div className="w-full sm:max-w-xl flex flex-col gap-10 mt-10">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-medium">Editar perfil</span>
          <span className="text-base text-gray-500">
            Atualize as informações do seu perfil
          </span>
        </div>

        <form className="flex flex-col gap-8" onSubmit={onUpdateProfileSubmit}>
          <div className="flex flex-col gap-3">
            <label htmlFor="name">Nome</label>
            <input
              className="border border-gray-300 rounded-lg h-14 p-3"
              name="name"
              id="name"
              ref={nameRef}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="email">Bio</label>
            <input
              className="border border-gray-300 rounded-lg h-14 p-3"
              name="bio"
              id="bio"
              ref={bioRef}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="password">Senha</label>
            <input
              className="border border-gray-300 rounded-lg h-14 p-3"
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              id="password"
              ref={passwordRef}
            />
            <button type="button" className="w-fit my-2" onClick={toggleShowHidePassword}>
              <span className="text-blue-600 hover:text-blue-500 hover:cursor-pointer transition-all">
                {isPasswordVisible ? 'Esconder senha' : 'Mostrar senha'}
              </span>
            </button>
          </div>

          <button
            type="submit"
            className="h-14 rounded-lg w-full bg-blue-950 disabled:bg-gray-400 text-gray-50 flex items-center justify-center gap-4 hover:bg-blue-900 transition-colors cursor-pointer"
            disabled={loading}
          >
            {!loading ? (
              <span>Salvar</span>
            ) : (
              <Loader size={24} className="animate-spin" />
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
