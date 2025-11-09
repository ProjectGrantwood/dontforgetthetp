'use server';

import postgres from "postgres";
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { signIn } from '../../../auth'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const SignupSchema = z.object({
    email: z.email(),
    name: z.string(),
    password: z.string().min(6).max(200)
});

export async function signupAction(prevState: string | undefined, formData: FormData): Promise<string | undefined> {
    
    const rawSignupData = {
        email: formData.get('email'),
        name: formData.get('name');
        password: formData.get('password')
    }
    
    if (typeof rawSignupData.email === 'string'){
        rawSignupData.email = rawSignupData.email.trim();
    }
    
    const parsedSignupData = SignupSchema.safeParse(rawSignupData);
    
    if (!parsedSignupData.success) {
        console.log(parsedSignupData);
        return `Signup not successful`
    }
    
    const {email, name, password } = parsedSignupData.data;
    
    const userEmailExists = await sql`SELECT 1 FROM users WHERE email = ${email} LIMIT 1`;

    
    if (userEmailExists.length > 0) {
        return "User email already exists"
    }
    
    const passwordHash = await bcrypt.hash(password, 12);
    
    try {
        const createdAt = new Date().toISOString();
        const updatedAt = new Date().toISOString();
            await sql`
                INSERT INTO neon_auth.users_sync (email, hashed_password, created_at, updated_at)
                VALUES (${email}, ${passwordHash}, ${createdAt}, ${updatedAt})
                RETURNING email, created_at, updated_at
            `;
    } catch (error) {
        console.log(error);
        return "Error signing up user";
    }
        
    try {
        await signIn('credentials', {email: email, password, redirectTo: '/home'});
    } catch (error) {
        console.error(error);
        return "Error signing in user";
    }
    
}