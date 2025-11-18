import postgres from "postgres";
import { ItemTemplate } from "@/types/entities";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getAllItems() {
  const itemTemplates = await sql<ItemTemplate[]>`
    SELECT * FROM item_templates;
  `;
  return itemTemplates;
}

export async function getItemTemplateById(id: string) {
  const itemTemplate = await sql<ItemTemplate[]>`
      SELECT * FROM item_templates
      WHERE id = ${id}
    `;
  return itemTemplate[0];
}
