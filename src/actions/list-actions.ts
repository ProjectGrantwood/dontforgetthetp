import postgres from "postgres";
import { ShoppingList } from "@/types/entities";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

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
