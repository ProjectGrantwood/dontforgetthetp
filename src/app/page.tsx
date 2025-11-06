import BrandHeader from '@/components/global-components/brand-header';
import LinkButton from '@/components/global-components/link-button';

export default function Page() {
  return (
    <div className="flex flex-col w-full h-screen">
      <BrandHeader />
      <main className="min-w-max h-2/3 flex flex-col items-center justify-center m-auto">
        <div className="mb-3">
          <LinkButton href="/login" displayText="Login" />
        </div>
        <div className="mt-3">
          <LinkButton href="/signup" displayText="Signup" />
        </div>
      </main>
    </div>
  );
}
