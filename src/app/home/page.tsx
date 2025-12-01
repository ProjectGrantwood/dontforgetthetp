import { Suspense } from "react";
import LinkButton from "@/components/global-components/link-button";
import ListPreviewSkeleton from "@/components/home-components/list-preview-skeleton";
import ListPreview from "@/components/home-components/home-list-preview";
import { stackServerApp } from "@/stack/server";
import { cache } from "react";
import { getListsByUserIdService } from "@/services/list-service";
import { ShoppingListWithUserMeta } from "@/types/dto";
import { Pin, Clock } from "lucide-react";

const cachedGetListsByUserIdService = cache(getListsByUserIdService);

export default async function Page() {
  const user = await stackServerApp.getUser({ or: "redirect" });
  const lists = await cachedGetListsByUserIdService(user.id);
  const pinnedLists: ShoppingListWithUserMeta[] = [];
  const recentLists: ShoppingListWithUserMeta[] = [];
  lists.forEach((l) =>
    l.is_pinned ? pinnedLists.push(l) : recentLists.push(l),
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
            listPreviewName="Pinned Lists"
            icon={<Pin size={20} className="my-auto mr-1" />}
          />
        }
      >
        <ListPreview
          lists={pinnedLists}
          listPreviewName="Pinned Lists"
          icon={<Pin size={20} className="my-auto mr-1" />}
        />
        {/*<ListPreviewSkeleton
          listPreviewName="Pinned Lists"
          icon={<Pin size={20} className="my-auto mr-1" />}
        />*/}
      </Suspense>
      <Suspense
        fallback={
          <ListPreviewSkeleton
            listPreviewName="Recent Lists"
            icon={<Clock size={20} className="my=auto mr-1" />}
          />
        }
      >
        <ListPreview
          lists={recentLists}
          listPreviewName="Recent Lists"
          icon={<Clock size={20} className="my-auto mr-1" />}
        />
      </Suspense>
    </div>
  );
}
