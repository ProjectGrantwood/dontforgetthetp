import {
  createList,
  getListByUserIdAndListId,
  getListsByUserId,
  updateList,
  deleteList,
} from "@/db/data-access/list-access";
import { addOrUpdateListUser } from "@/db/data-access/shoppinglist-join-users-access";

import { ShoppingListData } from "@/types/dto";

export const createListService = async (listData: ShoppingListData) => {
  const listId = await createList(
    listData.list_id,
    listData.list_name,
    listData.is_public,
    listData.list_notes,
  );
  return listId;
};

export const getListByUserIdAndListIdService = async (
  userId: string,
  listId: string,
) => {
  // needs user role verification or check that the list is public
  const list = await getListByUserIdAndListId(userId, listId);
  return list;
};

export const getListsByUserIdService = async (userId: string) => {
  const lists = getListsByUserId(userId);
  return lists;
};

export const updateListService = async (
  userId: string,
  listId: string,
  listName?: string,
) => {
  // needs user role verification
  const updatedList = await updateList(userId, listId, listName);
  return updatedList;
};

export const deleteListService = async (userId: string, listId: string) => {
  // needs user role verification
  const deletedList = await deleteList(listId);
  return deletedList;
};
