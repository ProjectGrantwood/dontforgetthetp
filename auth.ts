import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/entities/entities';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | null> {
  try {
    const rows = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return rows[0] ?? null;
  } catch (err) {
    console.error('Failed to fetch user:', err);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    
    Credentials({
      async authorize(
        credentials: Partial<Record<string, unknown>>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _request: Request
      ): Promise<User | null> {
        const parsed = z
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;
        const user = await getUser(email);
        if (!user) {
          return null;
        }

        const ok = await bcrypt.compare(password, user.hashed_password);
        if (!ok) {
          console.log('Invalid credentials');
          return null;
        }
        return { ...user };
      },
    }),
    
  ],
});