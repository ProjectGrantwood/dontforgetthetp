import { sql } from "@/lib/postgresSql";
import { ShoppingList } from "@/types/entities";

export async function createList(userId: string, listName: string) {
  const [{ listId }] =
    await sql`INSERT INTO shopping_lists (list_name, is_public, created_at, updated_at) VALUES (${listName}, false, NOW(), NOW()) RETURNING list_id`;
  await sql`INSERT INTO shopping_lists_join_users (list_id, user_id, user_role, is_pinned) VALUES (${listId}, ${userId}, 'OWNER', true)`;
  return listId;
}

export async function getListsByUserId(userId: string) {
  const lists = await sql<ShoppingList[]>`
        SELECT sl.list_id, sl.list_name, sl.is_public, sl.created_at, sl.updated_at, slju.user_role, slju.is_pinned
        FROM shopping_lists sl
        JOIN shopping_lists_join_users slju ON sl.list_id = slju.list_id
        WHERE slju.user_id = ${userId}
        ORDER BY sl.updated_at DESC;
    `;
  return lists;
}

export async function getListByUserId(userId: string, listId: string) {
  const lists = await sql<ShoppingList[]>`
        SELECT sl.list_id, sl.list_name, sl.is_public, sl.created_at, sl.updated_at, slju.user_role, slju.is_pinned
        FROM shopping_lists sl
        JOIN shopping_lists_join_users slju ON sl.list_id = slju.list_id
        WHERE slju.user_id = ${userId} AND sl.list_id = ${listId}
    `;
  return lists[0];
}

export async function updateList(
  userId: string,
  listId: string,
  listName?: string,
  listNotes?: string,
  isPublic?: boolean,
) {
  const sets = [sql`updated_at = NOW()`];

  if (listName !== undefined) sets.push(sql`list_name = ${listName}`);
  if (listNotes !== undefined) sets.push(sql`list_notes = ${listNotes}`);
  if (isPublic !== undefined) sets.push(sql`is_public = ${isPublic}`);

  await sql`
    UPDATE shopping_lists
    SET ${sql.join(sets, sql`, `)}
    WHERE id = ${listId}
  `;

  await sql`UPDATE shopping_lists SET updated_at = NOW() WHERE list_id = ${listId}`;
  await sql`UPDATE shopping_lists_join_users SET updated_at = NOW() WHERE list_id = ${listId} AND user_id = ${userId}`;
}
