import { Link } from "react-router";

import { useSign } from "./useSignIn";

export function SignIn() {
  const { emailRef, passwordRef, onSignInSubmit } = useSign();

  return (
    <div className="flex justify-center p-6 mt-10">
      <div className="w-full sm:max-w-xl flex flex-col gap-10 mt-10">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-medium">Faça login</span>
          <span className="text-base text-gray-500">
            E veja o que as pessoas estão compartilhando.
          </span>
        </div>

        <form className="flex flex-col gap-8" onSubmit={onSignInSubmit}>
          <div className="flex flex-col gap-3">
            <label htmlFor="email">E-mail</label>
            <input
              className="border border-gray-300 rounded-lg h-14 p-3"
              type="email"
              name="email"
              id="email"
              ref={emailRef}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="password">Senha</label>
            <input
              className="border border-gray-300 rounded-lg h-14 p-3"
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
            />
          </div>

          <button
            type="submit"
            className="h-14 rounded-lg bg-blue-950 text-gray-50 hover:bg-blue-900 transition-colors cursor-pointer w-full"
          >
            Entrar
          </button>
        </form>

        <div className="flex items-center gap-2 justify-center">
          <span className="font-medium text-base">Não possui conta?</span>
          <Link to="/sign-up" className="text-base text-blue-800">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
