import { UserRole } from "@/types/entities";
import {
  addOrUpdateListUser,
  getHomepageListsByUserId,
  getListJoinUserByListIdAndUserId,
} from "@/db/data-access/shoppinglist-join-users-access";

export const addOrUpdateUserListRoleService = async (
  userId: string,
  listId: string,
  userRole: UserRole,
  isPinned: boolean,
) => {
  const userUpdate = await addOrUpdateListUser(
    userId,
    listId,
    userRole,
    isPinned,
  );
  return userUpdate;
};

export const getListJoinUserByListIdAndUserIdService = async (
  listId: string,
  userId: string,
) => {
  const listJoinUser = await getListJoinUserByListIdAndUserId(listId, userId);
  return listJoinUser;
};

export const getHomepageListsByUserIdService = async (userId: string) => {
  const lists = await getHomepageListsByUserId(userId);
  return lists;
};
