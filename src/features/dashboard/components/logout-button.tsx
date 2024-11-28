'use client';

import { Button } from '@/components/ui/button';
import { signOutAction } from '@/server/actions/auth';
import { LogOutIcon } from 'lucide-react';

export default function LogoutButton() {
  return (
    <Button
      size="sm"
      variant="link"
      aria-label="Sign out"
      className="flex size-min items-center space-x-2 p-1 font-semibold text-card-foreground"
      onClick={async () => await signOutAction()}
    >
      <span>Sign out</span>
      <LogOutIcon aria-hidden="true" focusable="false" size="1rem" />
    </Button>
  );
}
