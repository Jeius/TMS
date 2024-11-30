'use client';

import { supabaseBrowserClient } from '@/lib/supabase/client';
import { AuthChangeEvent, User } from '@supabase/supabase-js';
import { debounce } from 'lodash';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ContextValue = {
  isSignedIn: boolean;
  isMounted: boolean;
  user: User | null;
};

const AuthContext = createContext<ContextValue>({
  isSignedIn: false,
  isMounted: false,
  user: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = supabaseBrowserClient();

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsSignedIn(!!user);
      setUser(user);
      setIsMounted(true);
    }

    const debouncedSetAuthState = debounce((event: AuthChangeEvent) => {
      if (event === 'SIGNED_OUT') {
        setIsSignedIn(false);
        setUser(null);
      } else if (event === 'SIGNED_IN') {
        checkUser();
      }
    }, 300);

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      debouncedSetAuthState(event);
    });

    checkUser();

    return () => {
      authListener?.subscription.unsubscribe();
      debouncedSetAuthState.cancel(); // Cancel debounce on cleanup
    };
  }, [supabase]);

  const contextValue: ContextValue = useMemo(
    () => ({ isSignedIn, isMounted, user }),
    [isSignedIn, isMounted, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
