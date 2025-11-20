import { sql } from "@/lib/connections/postgresSql";
import { ShoppingList } from "@/types/entities";

export async function createList(
  listId: string,
  listName: string,
  isPublic: boolean,
  listNotes: string | null,
) {
  await sql`INSERT INTO shopping_lists (list_id, list_name, list_notes, is_public, created_at, updated_at) VALUES (${listId}, ${listName}, ${listNotes ?? null}, ${isPublic}, NOW(), NOW()) RETURNING list_id`;
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

export async function getListByUserIdAndListId(userId: string, listId: string) {
  const lists = await sql<ShoppingList[]>`
        SELECT sl.list_id, sl.list_name, sl.is_public, sl.created_at, sl.updated_at, slju.user_role, slju.is_pinned
        FROM shopping_lists sl
        JOIN shopping_lists_join_users slju ON sl.list_id = slju.list_id
        WHERE slju.user_id = ${userId} AND sl.list_id = ${listId}
    `;
  return lists[0];
}

export async function updateList(
  listId: string,
  listName?: string,
  listNotes?: string,
  isPublic?: boolean,
) {
  const updates: Record<string, unknown> = {};

  if (listName !== undefined) updates.list_name = listName;
  if (listNotes !== undefined) updates.list_notes = listNotes;
  if (isPublic !== undefined) updates.is_public = isPublic;

  if (Object.keys(updates).length === 0) {
    return;
  }

  const list = await sql`
    UPDATE shopping_lists
    SET
      ${sql(updates)},
      updated_at = NOW()
    WHERE list_id = ${listId}
  `;

  return list;
}

export async function deleteList(listId: string) {
  const deletedListId = await sql`
      DELETE FROM shopping_lists 
      WHERE list_id = ${listId}
      RETURNING list_id;
    `;
  return deletedListId;
}
