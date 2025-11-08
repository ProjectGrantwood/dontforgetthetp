import Link from "next/link";
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import { quicksand } from "@/branding/fonts";
import { Suspense } from "react";
import PinnedListsSkeleton from "@/components/home-components/pinned-lists-skeleton";
import PinnedLists from "@/components/home-components/pinned-lists";

export default async function Page() {
    const session = await auth();
    if (!session) {
        redirect('/login');
    }
    return (
        <div className="flex flex-col w-full h-screen">
            <div className="flex flex-col w-7/8 mx-auto mb-auto mt-3">
                <Link href='/create-new-list' className={`${quicksand.className} min-w-100% text-3xl rounded-lg bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-600 p-3 m-auto mb-3`}>
                    + New List
                </Link>
                <Suspense fallback={<PinnedListsSkeleton />}>
                    <PinnedLists />
                </Suspense>
            </div>
        </div>
    )
}