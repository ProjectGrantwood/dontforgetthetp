import SignupForm from '@/components/signup-components/SignupForm';
import { Suspense } from 'react';
 
export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center m-auto">
        
        <Suspense>
          <SignupForm />
        </Suspense>

    </div>
  );
}