import { Link } from "react-router";
import { Loader } from "lucide-react";

import { useSignUp } from "./useSignUp";

export function SignUp() {
  const { nameRef, emailRef, passwordRef, loading, onRegisterSubmit } =
    useSignUp();

  return (
    <div className="flex flex-col p-6 gap-10 mt-10">
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-medium">Faça o cadastro</span>
        <span className="text-base text-gray-500">
          E fique por dentro das ultimas postagens.
        </span>
      </div>

      <form className="flex flex-col gap-8" onSubmit={onRegisterSubmit}>
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
          className="h-14 rounded-lg w-full bg-blue-950 disabled:bg-gray-400 text-gray-50 flex items-center justify-center gap-4 hover:bg-blue-900 transition-colors cursor-pointer"
          disabled={loading}
        >
          {!loading ? (
            <span>Cadastrar</span>
          ) : (
            <Loader size={24} className="animate-spin" />
          )}
        </button>
      </form>

      <div className="flex items-center gap-2 justify-center">
        <span className="font-medium text-base">Já possui conta?</span>
        <Link to="/sign-in" className="text-base text-blue-800">
          Faça login
        </Link>
      </div>
    </div>
  );
}
