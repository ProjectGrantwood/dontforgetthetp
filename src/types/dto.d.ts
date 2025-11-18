export type ListItemData = {
  id: string;
  list_item_id: string;
  item_name: string;
  default_units: string;
  amount: number;
  notes?: string;
};

export type ShoppingListJoinItemData = {
  list_id: string;
  item_id: string;
  item_name: string;
  item_notes: string | null;
  default_units: string;
  amount: number;
  checked_off: boolean;
};
