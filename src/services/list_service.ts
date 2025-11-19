import {
  createList,
  getListByUserId,
  updateList,
  deleteList,
} from "@/db/data-access/list-access";

export const createListService = async (userId: string, listName: string) => {
  const listId = await createList(userId, listName);
  return listId;
};

export const getListByUserIdService = async (
  userId: string,
  listId: string,
) => {
  const list = await getListByUserId(userId, listId);
  return list;
};

export const updateListService = async (
  userId: string,
  listId: string,
  listName?: string,
) => {
  const updatedList = await updateList(userId, listId, listName);
  return updatedList;
};

export const deleteListService = async (userId: string, listId: string) => {
  const deletedList = await deleteList(userId, listId);
  return deletedList;
};
