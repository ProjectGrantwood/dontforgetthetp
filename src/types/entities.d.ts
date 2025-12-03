export type UserRole = "owner" | "editor" | "viewer";

export type UserRelationshipStatus = "pending" | "accepted" | "blocked";

export type ShoppingList = {
  list_id: string;
  list_name: string;
  list_notes: string | null;
  item_count: number;
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
  item_name: string;
  item_notes: string | null;
  default_units: string;
  amount: number;
  checked_off: boolean;
  created_at: string;
  updated_at: string;
};

export type ShoppingSession = {
  list_id: string;
  user_id: string;
  started_at: string;
  ended_at: string;
};

export type UserRelationship = {
  user_id_1: string;
  user_id_2: string;
  status: UserRelationshipStatus;
  prev_status: UserRelationshipStatus | null;
  user_initiating_action_id: string;
  created_at: string;
  updated_at: string;
};
