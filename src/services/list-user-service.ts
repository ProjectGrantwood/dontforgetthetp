import { UserRole } from "@/types/entities";
import { addOrUpdateListUser } from "@/db/data-access/shoppinglist-join-users-access";

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
