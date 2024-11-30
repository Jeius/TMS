'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-provider';
import { useToast } from '@/lib/hooks/use-toast';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ComponentPropsWithRef } from 'react';

export default function LogoutButton(
  props: ComponentPropsWithRef<typeof Button>
) {
  const router = useRouter();
  const { toast } = useToast();
  const { supabase } = useAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Error signing out',
        description: error.message,
      });
    } else {
      router.refresh();
    }
  };
  return (
    <Button size="sm" aria-label="Sign out" onClick={handleLogout} {...props}>
      <span>Sign out</span>
      <LogOutIcon aria-hidden="true" focusable="false" size="1rem" />
    </Button>
  );
}
