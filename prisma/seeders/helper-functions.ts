import { Prefix, Role, Suffix } from '../generated/client';

export function getRandomBoolean(probability = 0.5): boolean {
  if (probability < 0 || probability > 1) {
    throw new Error('Probability must be between 0 and 1.');
  }
  return Math.random() < probability;
}

export const getRandomRole = (roles: Role[]) => {
  const randomRole = roles[Math.floor(Math.random() * roles.length)];
  return randomRole;
};

export const getRandomPrefix = (prefixes: Prefix[]) => {
  const returnPrefix = getRandomBoolean();
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  if (returnPrefix) return randomPrefix;
};

export const getRandomSuffix = (suffixes: Suffix[]) => {
  const returnSuffix = getRandomBoolean(0.8);
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  if (returnSuffix) return randomSuffix;
};

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error(
//     'Supabase URL or Anon Key is missing in the environment variables.'
//   );
// }
// // Helper Types
// type UserMetaData = { email: string; firstName: string; lastName: string };

// const supabase = createClient(supabaseUrl, supabaseAnonKey);
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// async function createSupabaseUser() {
//   const email = faker.internet.email();
//   const firstName = faker.person.firstName();
//   const lastName = faker.person.lastName();

//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.signInAnonymously({
//     options: { data: { email, firstName, lastName } as UserMetaData },
//   });

//   if (error) {
//     console.error('Error creating user:', error.message);
//     return null;
//   }

//   return user;
// }
