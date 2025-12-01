import { sql } from "@/lib/connections/postgresSql";
import { ShoppingListWithUserMeta } from "@/types/dto";
import { ShoppingList } from "@/types/entities";

export async function createList(
  listId: string,
  listName: string,
  isPublic: boolean,
  itemCount: number,
  listNotes: string | null,
) {
  await sql`INSERT INTO shopping_lists (list_id, list_name, list_notes, item_count, is_public, created_at, updated_at) VALUES (${listId}, ${listName}, ${listNotes ?? null}, ${itemCount}, ${isPublic}, NOW(), NOW()) RETURNING list_id`;
  return listId;
}

export async function getListsByUserId(userId: string) {
  const lists = await sql<ShoppingListWithUserMeta[]>`
        SELECT sl.list_id, sl.list_name, sl.list_notes, sl.item_count, sl.is_public, slju.is_pinned, slju.user_role, sl.updated_at
        FROM shopping_lists sl
        JOIN shopping_lists_join_users slju ON sl.list_id = slju.list_id
        WHERE slju.user_id = ${userId}
        ORDER BY sl.updated_at DESC;
    `;
  return lists;
}

export async function getListById(listId: string): Promise<ShoppingList> {
  const list = await sql<ShoppingList[]>`
      SELECT * FROM shopping_lists
      WHERE list_id = ${listId};
    `;
  return list[0];
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
