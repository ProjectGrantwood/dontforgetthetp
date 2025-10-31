import BrandHeader from "@/components/global-components/brand-header";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-screen">
      <BrandHeader />
      <main className="min-w-max h-2/3 flex flex-col items-center justify-center m-auto">
        <button className="min-w-100% text-3xl rounded-lg bg-blue-800 hover:bg-blue-700 active:bg-blue-600 p-3 mx-auto mt-auto mb-6">Login</button>
        <button className="min-w-100% text-3xl rounded-lg bg-blue-800 hover:bg-blue-700 active:bg-blue-600 p-3 mx-auto mb-auto">Signup</button>
      </main>
    </div>
  );
}
