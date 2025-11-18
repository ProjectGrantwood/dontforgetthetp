import postgres from "postgres";
import { ShoppingListJoinItem } from "@/types/entities";
import { ShoppingListJoinItemData } from "@/types/dto";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getAllItemsByShoppingListId(
  id: string,
): Promise<ShoppingListJoinItem[]> {
  const items = await sql<ShoppingListJoinItem[]>`
        SELECT * FROM shopping_list_join_items WHERE shopping_list_id = ${id}
    `;
  return items;
}

export async function createItem(
  itemData: ShoppingListJoinItemData,
): Promise<ShoppingListJoinItem> {
  const item = await sql<ShoppingListJoinItem[]>`
        INSERT INTO shopping_list_join_items (list_item_id, item_id, list_id, item_name, item_notes, default_units, amount, checked_off, created_at, updated_at)
        VALUES (${itemData.list_id}, ${itemData.item_id}, ${itemData.list_id}, ${itemData.item_name}, ${itemData.item_notes}, ${itemData.default_units}, ${itemData.amount}, ${itemData.checked_off}, NOW(), NOW())
        RETURNING *
    `;
  return item[0];
}

export async function updateItem(
  itemData: ShoppingListJoinItemData,
): Promise<ShoppingListJoinItem> {
  const item = await sql<ShoppingListJoinItem[]>`
        UPDATE shopping_list_join_items
        SET item_id = ${itemData.item_id}, list_id = ${itemData.list_id}, item_name = ${itemData.item_name}, item_notes = ${itemData.item_notes}, default_units = ${itemData.default_units}, amount = ${itemData.amount}, checked_off = ${itemData.checked_off}, updated_at = NOW()
        WHERE id = ${itemData.item_id}
        RETURNING *
    `;
  return item[0];
}
