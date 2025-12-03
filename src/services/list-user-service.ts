import {
  addOrUpdateListUser,
  getHomepageListsByUserId,
  getListJoinUserByListIdAndUserId,
} from "@/db/data-access/shoppinglist-join-users-access";
import { UserRole } from "@/types/entities";

export async function addOrUpdateUserListRoleService(
  userId: string,
  listId: string,
  userRole: UserRole,
  isPinned: boolean,
) {
  const userUpdate = await addOrUpdateListUser(
    userId,
    listId,
    userRole,
    isPinned,
  );
  return userUpdate;
}

export async function getListJoinUserByListIdAndUserIdService(
  listId: string,
  userId: string,
) {
  const listJoinUser = await getListJoinUserByListIdAndUserId(listId, userId);
  return listJoinUser;
}

export async function getHomepageListsByUserIdService(userId: string) {
  const lists = await getHomepageListsByUserId(userId);
  return lists;
}
