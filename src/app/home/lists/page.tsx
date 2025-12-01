// app/home/lists/page.tsx (or app/lists/page.tsx, depending on your routing)

import { Suspense } from "react";
import LinkButton from "@/components/global-components/link-button";
import ListPreviewSkeleton from "@/components/home-components/list-preview-skeleton";
import ListPreview from "@/components/list-components/list-preview";
import { stackServerApp } from "@/stack/server";
import { cache } from "react";
import { getListsByUserIdService } from "@/services/list-service";
import type { ShoppingListWithUserMeta } from "@/types/dto";
import { Clock } from "lucide-react";

const cachedGetListsByUserIdService = cache(getListsByUserIdService);

export default async function Page() {
  const user = await stackServerApp.getUser({ or: "redirect" });
  const lists = await cachedGetListsByUserIdService(user.id);
  const sortedLists: ShoppingListWithUserMeta[] = [...lists].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );

  return (
    <div className="flex flex-col w-full mx-auto mb-auto mt-3">
      <div className="w-auto m-auto mb-3">
        <LinkButton href="/home/lists/create-new-list" className="text-3xl">
          Create New List
        </LinkButton>
      </div>

      <Suspense
        fallback={
          <ListPreviewSkeleton
            listPreviewName="All Lists"
            icon={<Clock size={20} className="my-auto mr-1" />}
          />
        }
      >
        <ListPreview
          lists={sortedLists}
          listPreviewName="All Lists"
          icon={<Clock size={20} className="my-auto mr-1" />}
        />
      </Suspense>
    </div>
  );
}
