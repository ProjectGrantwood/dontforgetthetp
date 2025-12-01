import ListCard from "@/components/global-components/list-card";
import { ShoppingListWithUserMeta } from "@/types/dto";

export default async function ListPreview({
  icon,
  lists,
  listPreviewName,
}: {
  icon?: React.ReactNode;
  lists: ShoppingListWithUserMeta[];
  listPreviewName: string;
}) {
  return (
    <div className="mx-auto my-1.5 w-full px-4 py-3 text-center p-3 rounded bg-zinc-900">
      <h1 className="flex text-3xl pb-3">
        {icon}
        {listPreviewName}
      </h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {lists.map((list) => (
          <ListCard
            key={list.list_id}
            id={list.list_id}
            name={list.list_name}
            itemCount={list.item_count}
            updatedAt={list.updated_at}
            isPublic={list.is_public}
          />
        ))}
      </div>
    </div>
  );
}
