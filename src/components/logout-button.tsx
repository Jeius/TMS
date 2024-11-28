'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/lib/hooks/use-toast';
import { supabaseBrowserClient } from '@/lib/supabase/client';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton(
  props: React.ComponentPropsWithRef<typeof Button>
) {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabaseBrowserClient().auth.signOut();
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
