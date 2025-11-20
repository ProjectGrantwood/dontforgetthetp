import { sql } from "@/lib/connections/postgresSql";
import { UserRole, ShoppingListJoinUser } from "@/types/entities";

// Updates the user's role for the list, as well as the pinned status of the list for that user.
export async function addOrUpdateListUser(
  userId: string,
  listId: string,
  userRole: UserRole,
  isPinned: boolean,
) {
  const userUpdate = await sql<ShoppingListJoinUser[]>`
    INSERT INTO public.shopping_lists_join_users (user_id, list_id, user_role, is_pinned, created_at, updated_at)
    VALUES (${userId}, ${listId}, ${userRole}, ${isPinned}, NOW(), NOW())
    ON CONFLICT (user_id, list_id)
    DO UPDATE SET user_role = EXCLUDED.user_role, is_pinned = EXCLUDED.is_pinned, updated_at = NOW()
    RETURNING *;
  `;
  return userUpdate;
}

export async function findAllListUsersWithRole(listId: string, role: UserRole) {
  const roles = await sql`
    SELECT user_id FROM shopping_lists_join_users
    WHERE list_id = ${listId} AND user_role = ${role}
  `;
  return roles;
}

export async function getAllListUsers(listId: string) {
  const users = await sql`
      SELECT user_id FROM shopping_lists_join_users
      WHERE list_id = ${listId};
    `;
  return users;
}
