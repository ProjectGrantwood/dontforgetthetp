export type User = {
    user_id: string,
    display_name: string,
    email: string,
    hashed_password: string
}

export type ShoppingList = {
    list_id: string,
    list_name: string,
    list_notes: string,
    is_public: boolean,
    created_at: string,
    updated_at: string
}

export type ItemTemplate = {
    item_template_id: string,
    user_id: string | undefined,
    item_name: string,
    default_unit: string,
    is_global: boolean
}

export enum UserRole {
    onwer = 'owner',
    editor = 'editor',
    viewer = 'viewer'
}

export type ShoppingListsJoinUsers = {
    user_id: string,
    list_id: string,
    user_role: UserRole,
    is_pinned: boolean
}

export type ShoppingListsJoinItems = {
    list_item_id: string,
    list_id: string,
    template_id: string,
    item_name: string,
    units_name: string,
    amount: number,
    checked_off: boolean,
    created_at: string,
    updated_at: string
}