import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    
    pages: {
        signIn: '/login',
    },
    
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24,
        updateAge: 60 * 60
    },
    
    jwt: {
        maxAge: 60 * 60 * 24
    },
    
    ...(process.env.NODE_ENV == 'production'
    ? {}
    : {
        cookies: {
          sessionToken: {
            name: 'authjs.session-token',
            options: {
              httpOnly: true,
              sameSite: 'lax',
              path: '/',
              secure: false,
            },
          },
        },
      }
    ),
    
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/home');
            if (isOnDashboard) {
                return isLoggedIn;
            }
            if (isLoggedIn) {
                return Response.redirect(new URL('/home', nextUrl));
            }
            return true;
        },
    },
    
  providers: [],
  
} satisfies NextAuthConfig;