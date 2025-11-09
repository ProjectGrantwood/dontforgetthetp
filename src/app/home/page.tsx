import { Suspense } from 'react';
import AddButton from '@/components/global-components/add-button'
import PinnedListsSkeleton from '@/components/home-components/pinned-lists-skeleton';
import PinnedLists from '@/components/home-components/pinned-lists';

export default function Page() {
    return (
            <div className="flex flex-col w-7/8 mx-auto mb-auto mt-3">
                <div className="w-auto m-auto pb-3">
                    <AddButton href='/create-new-list' displayText = "Create New List"></AddButton>
                </div>
                <Suspense fallback={<PinnedListsSkeleton />}>
                    <PinnedLists />
                </Suspense>
            </div>
    )
}