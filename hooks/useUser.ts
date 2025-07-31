// 📁 hooks/useUser.ts
import { useSession } from 'next-auth/react';

export const useUser = () => {
  const { data, status } = useSession();
  return {
    user: data?.user ?? null,
    loading: status === 'loading',
    authenticated: status === 'authenticated',
  };
};