import {
  createList,
  getListsByUserId,
  getListById,
  updateList,
  deleteList,
} from "@/db/data-access/list-access";

import { ShoppingListData, ShoppingListWithUserMeta } from "@/types/dto";

export async function createListService(listData: ShoppingListData) {
  const listId = await createList(
    listData.list_id,
    listData.list_name,
    listData.is_public,
    listData.item_count,
    listData.list_notes,
  );
  return listId;
}

export async function getListByIdService(listId: string) {
  const list = await getListById(listId);
  return list;
}

export async function getListsByUserIdService(userId: string) {
  const lists = await getListsByUserId(userId);
  function sortListsbyPinnedOrDate(
    listA: ShoppingListWithUserMeta,
    listB: ShoppingListWithUserMeta,
  ) {
    if (listA.is_pinned) {
      if (listB.is_pinned) {
        return listA.updated_at < listB.updated_at ? 1 : -1;
      }
      return -1;
    }
    if (listB.is_pinned) {
      return 1;
    }
    return listA.updated_at < listB.updated_at ? 1 : -1;
  }

  const listsSorted = lists.sort(sortListsbyPinnedOrDate);
  return listsSorted;
}

export async function updateListService(
  userId: string,
  listId: string,
  listName?: string,
) {
  // needs user role verification
  const updatedList = await updateList(userId, listId, listName);
  return updatedList;
}

export async function deleteListService(userId: string, listId: string) {
  // needs user role verification
  const deletedList = await deleteList(listId);
  return deletedList;
}
