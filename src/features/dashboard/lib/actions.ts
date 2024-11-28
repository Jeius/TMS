'use server';

import { supabaseServerClient } from '@/lib/supabase/server';
import prisma from '@/server/db';

export async function getUserProfile() {
  const supabase = await supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log('No user found');
    return null;
  }

  const userProfile = await prisma.profile.findFirst({
    select: {
      first_name: true,
      last_name: true,
      avatar: true,
      theme_preference: true,
      id_number: true,
      department: { select: { name: true } },
      role: { select: { name: true } },
      suffix: { select: { name: true } },
      prefix: { select: { name: true } },
    },
    where: { id: user.id },
  });

  return userProfile;
}
