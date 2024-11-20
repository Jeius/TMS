import { useEffect, useState } from 'react';
import { supabaseBrowserClient } from '../supabase/client';

function useAuthListener() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const supabase = supabaseBrowserClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsSignedIn(!!user);
      setIsMounted(true);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') setIsSignedIn(true);
      if (event === 'SIGNED_OUT') setIsSignedIn(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase]);

  return { isSignedIn, isMounted };
}

export default useAuthListener;
