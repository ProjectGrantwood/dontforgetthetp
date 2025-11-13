import postgres from "postgres";
import { ItemTemplate } from "@/types/entities";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getAllGlobalItems() {
  const globalItemTemplates = await sql<ItemTemplate[]>`
    SELECT * FROM item_templates
    WHERE is_global = TRUE;
  `;

  return globalItemTemplates;
}

export async function getAllUserItemTemplates(userId: string) {
  const userItemTemplates = await sql<ItemTemplate[]>`
      SELECT * FROM item_templates
      WHERE user_id = ${userId}
    `;
  return userItemTemplates;
}

export async function getItemTemplateById(id: string) {
  const itemTemplate = await sql<ItemTemplate[]>`
      SELECT * FROM item_templates
      WHERE id = ${id}
    `;
  return itemTemplate[0];
}
