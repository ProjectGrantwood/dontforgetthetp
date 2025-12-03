import {
  createItems,
  countListItems,
  getAllItemsByShoppingListId,
} from "@/db/data-access/shoppinglist-join-item-access";
import {
  ShoppingListJoinItemData,
  ShoppingListJoinNewItemData,
} from "@/types/dto";

export async function createItemsService(
  items: ShoppingListJoinNewItemData[],
  listId: string,
) {
  const convertNewItemToShoppingListItem = (
    item: ShoppingListJoinNewItemData,
    listId: string,
  ) {
    return {
      list_id: listId,
      list_item_id: item.list_item_id,
      item_name: item.item_name,
      item_notes: item.item_notes ?? null,
      default_units: item.default_units,
      amount: item.amount,
      checked_off: false,
    } as ShoppingListJoinItemData;
  };
  const convertedItems = items.map((item) =>
    convertNewItemToShoppingListItem(item, listId),
  );
  const itemsCreated = await createItems(convertedItems);
  return itemsCreated;
};

export async function countListItemsService(listId: string) {
  const itemCount = await countListItems(listId);
  return itemCount;
};

export async function getAllItemsByShoppingListIdService(listId: string) {
  const items = await getAllItemsByShoppingListId(listId);
  return items;
};
