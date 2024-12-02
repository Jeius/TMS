import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserProfile } from '../lib/actions';

export default async function WelcomeHeader() {
  const userProfile = await getUserProfile();
  return (
    <CardHeader className="space-y-1">
      <CardTitle
        id="dashboard-welcome"
        className="text-3xl font-bold text-secondary"
      >
        Welcome, {userProfile ? (userProfile.first_name ?? 'User') : 'User'}
      </CardTitle>
      <CardDescription className="font-medium text-foreground">
        {userProfile?.role && `Role: ${userProfile.role.name}`}
      </CardDescription>
    </CardHeader>
  );
}
