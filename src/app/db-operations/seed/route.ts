import { GLOBAL_ITEM_TEMPLATES } from '@/db/global-item-templates';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedItemTemplates() {
    const insertedItemTemplates = await Promise.all(
        GLOBAL_ITEM_TEMPLATES.map(
            (item) => sql`
                INSERT INTO item_templates (item_name, default_unit, is_global)
                VALUES (${item.item_name}, ${item.default_unit}, TRUE);
            `,
        ),
    );
    return insertedItemTemplates;
}

export async function GET() {
    try {
        await sql.begin( () => [ seedItemTemplates() ]);
        return Response.json( { messsage: 'Item templates seeded succesfully' } )
    } catch (error) {
        return Response.json( { error: String(error) }, { status: 500 })
    }
}