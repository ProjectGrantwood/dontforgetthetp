import postgres from 'postgres';
import { GLOBAL_ITEM_TEMPLATES } from '@/db/global-item-templates';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require', prepare: false });

async function seedGlobalItemTemplates() {
    const insertedItemTemplates = await Promise.all(
        GLOBAL_ITEM_TEMPLATES.map(
            (item) => sql`
                INSERT INTO item_templates (item_template_id, item_name, default_units, is_global, created_at, updated_at)
                VALUES (
                    ${item.item_template_id},
                    ${item.item_name}, 
                    ${item.default_units}, 
                    TRUE,
                    ${new Date().toISOString()},
                    ${new Date().toISOString()}
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
        return Response.json( { messsage: 'Data seeded successfully' } )
    } catch (error) {
        return Response.json( { error: String(error) }, { status: 500 })
    }
}