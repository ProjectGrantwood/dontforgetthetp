import { formatDate } from "@/lib/timeDateUtils";
import { stackServerApp } from "@/stack/server";
import ViewList from "@/components/list-components/view-list";
import { getListByIdService } from "@/services/list-service";
import { getListJoinUserByListIdAndUserIdService } from "@/services/list-user-service";
import { getAllItemsByShoppingListIdService } from "@/services/list-item-service";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const user = await stackServerApp.getUser({ or: "redirect" });
  const params = await props.params;
  const listId = params.id;
  const list = await getListByIdService(listId);
  const listJoinUser = await getListJoinUserByListIdAndUserIdService(
    listId,
    user.id,
  );
  const listItems = await getAllItemsByShoppingListIdService(listId);

  const formattedUpdatedAt = `Updated ${formatDate(new Date(Date.parse(list.updated_at)))}`;

  return (
    <ViewList
      listName={list.list_name}
      formattedDateLabel={formattedUpdatedAt}
      notes={list.list_notes}
      isPublic={list.is_public}
      isPinned={listJoinUser.is_pinned}
      items={listItems}
    />
  );
}
