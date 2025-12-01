import { sql } from "@/lib/connections/postgresSql";
import { ShoppingListJoinItem } from "@/types/entities";
import { ShoppingListJoinItemData } from "@/types/dto";

export async function getAllItemsByShoppingListId(
  id: string,
): Promise<ShoppingListJoinItem[]> {
  const items = await sql<ShoppingListJoinItem[]>`
        SELECT * FROM shopping_lists_join_items WHERE list_id = ${id}
    `;
  return items;
}

export async function createItem(
  listId: string,
  itemName: string,
  defaultUnits: string,
  amount: number,
  itemNotes?: string,
) {
  const itemInfo: Record<string, unknown> = {
    list_id: listId,
    item_name: itemName,
    default_units: defaultUnits,
    amount: amount,
  };
  if (itemNotes !== undefined) itemInfo.item_notes = itemNotes;

  const item = await sql`
        INSERT INTO shopping_lists_join_items (list_id, item_name, item_notes, default_units, amount, checked_off, created_at, updated_at)
        VALUES (${sql(itemInfo)}, false, NOW(), NOW())
        RETURNING *
    `;
  return item[0];
}

export async function createItems(items: ShoppingListJoinItemData[]) {
  const insertedItems = await sql`
      INSERT INTO shopping_lists_join_items ${sql(items)}
      RETURNING *
    `;
  return insertedItems;
}

export async function updateItem(
  listId: string,
  itemId: string,
  itemName?: string,
  itemNotes?: string,
  defaultUnits?: string,
  amount?: number,
  checkedOff?: boolean,
) {
  const updates: Record<string, unknown> = {};
  if (itemName !== undefined) updates.item_name = itemName;
  if (itemNotes !== undefined) updates.item_notes = itemNotes;
  if (defaultUnits !== undefined) updates.default_units = defaultUnits;
  if (amount !== undefined) updates.amount = amount;
  if (checkedOff !== undefined) updates.checkedOff = checkedOff;
  const item = await sql`
        UPDATE shopping_lists_join_items
        SET ${sql(updates)}, updated_at = NOW()
        WHERE list_id = ${listId} AND item_id = ${itemId}
    `;
  return item;
}

export async function toggleItemCheckedOff(
  listId: string,
  itemId: string,
  checkedOff: boolean,
) {
  await sql`
      UPDATE shopping_lists_join_items
      SET checked_off = ${checkedOff}
      WHERE list_id = ${listId} and item_id=${itemId}
    `;
}

export async function countListItems(listId: string) {
  const itemCount = await sql`
      SELECT COUNT(*) FROM shopping_list_join_items slju
      WHERE slju.list_id = ${listId}
    `;
  return itemCount;
}
