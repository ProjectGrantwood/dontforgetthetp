import { Suspense } from "react";
import LinkButton from "@/components/global-components/link-button";
import PinnedListsSkeleton from "@/components/home-components/pinned-lists-skeleton";
import PinnedLists from "@/components/home-components/pinned-lists";
import { stackServerApp } from "@/stack/server";

export default async function Page() {
  const user = await stackServerApp.getUser({ or: "redirect" });
  return (
    <div className="flex flex-col w-7/8 mx-auto mb-auto mt-3">
      <div className="w-auto m-auto pb-3">
        <LinkButton href="/home/lists/create-new-list">
          Create New List
        </LinkButton>
      </div>
      <Suspense fallback={<PinnedListsSkeleton />}>
        <PinnedLists userId={user.id} />
      </Suspense>
    </div>
  );
}
