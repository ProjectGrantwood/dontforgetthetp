import LoginForm from '@/components/login-components/loginForm';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center m-auto">
        
        <Suspense>
          <LoginForm />
        </Suspense>

    </div>
  );
}