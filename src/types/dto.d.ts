import { UserRole } from "@/types/entities";

export type ShoppingListJoinItemData = {
  list_id: string;
  list_item_id: string;
  item_name: string;
  item_notes: string | null;
  default_units: string;
  amount: number;
  checked_off: boolean;
};

// This type is for newly created lists (where items won't have a "checked off" field yet and the listId won't be generated))
export type ShoppingListJoinNewItemData = {
  list_item_id: string;
  item_name: string;
  item_notes: string | null;
  default_units: string;
  amount: number;
};

export type ShoppingListData = {
  list_id: string;
  list_name: string;
  list_notes: string | null;
  item_count: number;
  is_public: boolean;
};

export type ShoppingListUserData = {
  user_id: string;
  list_id: string;
  user_role: UserRole;
  is_pinned: boolean;
};

export type ShoppingListWithUserMeta = {
  list_id: string;
  list_name: string;
  list_notes: string | null;
  item_count: number;
  is_public: boolean;
  is_pinned: boolean;
  user_role: UserRole;
  updated_at: Date;
};
