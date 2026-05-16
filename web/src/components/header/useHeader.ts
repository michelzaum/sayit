import { useNavigate } from 'react-router';
import { toast } from "sonner";
import { useMutation } from "@apollo/client/react";
import { SIGN_OUT } from "./mutation";

export function useHeader() {
  const [signOut] = useMutation(SIGN_OUT);
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut();
      navigate('/sign-in');
      toast.success("Sessão encerrada com sucesso!");
    } catch {
      console.log('error');
      toast.error("Erro ao encerrar sessão. Tente novamente")
    }
  }

  return {
    handleSignOut,
  }
}