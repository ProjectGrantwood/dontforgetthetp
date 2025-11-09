import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import type { User } from "@/types/entities";
import bcrypt from "bcryptjs";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<User | null> {
    const rows = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return rows[0] ?? null;
}

export const authConfig = {
  
    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,
        updateAge: 60 * 60,
    },

    jwt: {
        maxAge: 60 * 60 * 24,
    },

    ...(process.env.NODE_ENV == "production"
        ? {}
        : {
              cookies: {
                  sessionToken: {
                      name: "authjs.session-token",
                      options: {
                          httpOnly: true,
                          sameSite: "lax",
                          path: "/",
                          secure: false,
                      },
                  },
              },
          }),

    providers: [
        Credentials({
            async authorize(credentials) {
                const parsed = z
                    .object({
                        email: z.email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (!parsed.success) {
                    return null;
                }

                parsed.data.email = parsed.data.email.trim();
                const { email, password } = parsed.data;
                const user = await getUser(email);
                if (!user) {
                    return null;
                }
                const ok = await bcrypt.compare(password, user.hashed_password);
                if (!ok) {
                    return null;
                }
                return { ...user };
            },
        }),
    ],
    
} satisfies NextAuthConfig;
