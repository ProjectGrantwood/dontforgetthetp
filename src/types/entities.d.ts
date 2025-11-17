export type User = {
  user_id: string;
  display_name: string;
  email: string;
  hashed_password: string;
  created_at: string;
  updated_at: string;
};

export type ShoppingList = {
  list_id: string;
  list_name: string;
  list_notes: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type ItemTemplate = {
  item_template_id: string;
  item_name: string;
  default_units: string;
  created_at: string;
  updated_at: string;
};

export type UserRole = "owner" | "editor" | "viewer";

export type ShoppingListJoinUser = {
  user_id: string;
  list_id: string;
  user_role: UserRole;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
};

export type ShoppingListJoinItem = {
  list_item_id: string;
  list_id: string;
  item_template_id: string | null;
  item_name: string;
  item_notes: string | null;
  default_units: string;
  amount: number;
  checked_off: boolean;
  created_at: string;
  updated_at: string;
};
