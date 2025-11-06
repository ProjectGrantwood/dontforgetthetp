'use server';

import { AuthError } from 'next-auth';
import { signIn } from '../../../auth';

export default async function signInAction(
    prevState: string | undefined,
    formData: FormData,
) {
    
    const email = formData.get('email');
    const password = formData.get('password');
    
    if (typeof email !== 'string' || typeof password !== 'string') {
        return "Missing email or password";
    }
    
    try {
        await signIn('credentials', {email, password, redirectTo: '/home'});
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === 'CredentialsSignin') {
                return 'Invalid credentials';
            }
            console.log(error);
            return 'Something went wrong';
        }
        throw error;
    }
}