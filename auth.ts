import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

import { UserCookie } from '@/types/cookie_types';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user_id = (user as UserCookie).user_id;
                token.email = (user as UserCookie).email;
            }
        }
    }

});