import { sql } from "@/lib/connections/postgresSql";
import { UserRole, ShoppingListJoinUser, ShoppingList } from "@/types/entities";

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

export async function getListJoinUserByListIdAndUserId(
  listId: string,
  userId: string,
) {
  const listJoinUser = await sql<ShoppingListJoinUser[]>`
      SELECT * FROM shopping_lists_join_users
      WHERE list_id = ${listId} AND user_id = ${userId}
    `;
  return listJoinUser[0];
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

export async function getHomepageListsByUserId(
  userId: string,
  limit = 7,
): Promise<ShoppingList[]> {
  const lists = await sql<ShoppingList[]>`
    SELECT
      sl.list_id,
      sl.list_name,
      sl.is_public,
      sl.created_at,
      sl.updated_at,
      slju.user_role,
      slju.is_pinned
    FROM shopping_lists sl
    JOIN shopping_lists_join_users slju
      ON sl.list_id = slju.list_id
    WHERE slju.user_id = ${userId}
    ORDER BY
      slju.is_pinned DESC,   -- pinned first
      sl.updated_at DESC     -- newest first within each group
    LIMIT ${limit}
  `;

  return lists;
}
