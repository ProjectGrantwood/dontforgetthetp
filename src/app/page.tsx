import BrandHeader from '@/components/global-components/brand-header';
import LinkButton from '@/components/global-components/link-button';
import { stackServerApp } from '@/stack/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await stackServerApp.getUser();
  if (user) {
    redirect('/home');
  }
  return (
    <div className="flex flex-col w-full h-screen">
      <BrandHeader />
      <main className="min-w-max h-2/3 flex flex-col items-center justify-center m-auto">
        <div className="mb-3">
          <LinkButton href="/handler/sign-in" displayText="Sign in" />
        </div>
        <div className="mt-3">
          <LinkButton href="/handler/sign-up" displayText="Sign up" />
        </div>
      </main>
    </div>
  );
}
