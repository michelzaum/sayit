import { useMutation } from "@apollo/client/react";
import { useNavigate } from 'react-router';
import { SIGN_OUT } from "./mutation";

export function useHeader() {
  const [signOut] = useMutation(SIGN_OUT);
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut();
      navigate('/sign-in');
    } catch {
      console.log('error');
    }
  }

  return {
    handleSignOut,
  }
}