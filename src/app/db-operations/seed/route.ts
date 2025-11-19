import { sql } from "@/lib/preparedPostgresSql";
import { GLOBAL_ITEM_TEMPLATES } from "@/db/global-item-templates";

async function seedGlobalItemTemplates() {
  const insertedItemTemplates = await Promise.all(
    GLOBAL_ITEM_TEMPLATES.map(
      (item) => sql`
                INSERT INTO item_templates (item_template_id, item_name, default_units)
                VALUES (
                    ${item.item_template_id},
                    ${item.item_name}, 
                    ${item.default_units}
                )
                ON CONFLICT (item_template_id) DO NOTHING;
            `,
    ),
  );
  return insertedItemTemplates;
}

export async function GET() {
  try {
    await seedGlobalItemTemplates();
    return Response.json({ messsage: "Data seeded successfully" });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
