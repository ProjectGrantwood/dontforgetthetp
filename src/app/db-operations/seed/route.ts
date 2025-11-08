import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import { GLOBAL_ITEM_TEMPLATES } from '@/db/global-item-templates';
import { 
    usersSeed, 
    shoppingListsSeed, 
    userItemTemplatesSeed, 
    shoppingListItemsSeed,
    shoppingListUsersSeed
} from '@/db/seed-data';

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

async function seedExampleUsers() {
    const hashed_password = await bcrypt.hash('password123', 12); // set all example users to have the "password123" password
    const insertedExampleUsers = await Promise.all(
        usersSeed.map(
            (user) => sql`
                INSERT INTO users (user_id, email, hashed_password, created_at, updated_at)
                VALUES (
                    ${user.user_id}, 
                    ${user.email}, 
                    ${hashed_password}, 
                    ${new Date().toISOString()}, 
                    ${new Date().toISOString()}
                )
                ON CONFLICT (user_id) DO NOTHING;
            `
        )
    );
    return insertedExampleUsers;
}

async function seedExampleShoppingLists() {
    const insertedExampleShoppingLists = await Promise.all(
        shoppingListsSeed.map(
            (list) => sql`
                INSERT INTO shopping_lists (list_id, list_name, list_notes, is_public, created_at, updated_at)
                VALUES (
                    ${list.list_id}, 
                    ${list.list_name}, 
                    ${list.list_notes}, 
                    ${list.is_public},
                    ${new Date().toISOString()},
                    ${new Date().toISOString()}
                )
                ON CONFLICT (list_id) DO NOTHING;
            `
        )
    );
    return insertedExampleShoppingLists;
}

async function seedExampleUserItemTemplates() {
    const insertedExampleUserItemTemplates = await Promise.all(
        userItemTemplatesSeed.map(
            (item) => sql`
                INSERT INTO item_templates (item_template_id, user_id, item_name, default_units, is_global, created_at, updated_at)
                VALUES (
                    ${item.item_template_id},
                    ${item.user_id},
                    ${item.item_name},
                    ${item.default_units},
                    FALSE,
                    ${new Date().toISOString()},
                    ${new Date().toISOString()}
                )
                ON CONFLICT (item_template_id) DO NOTHING;
            `
        )
    );
    return insertedExampleUserItemTemplates;
}

async function seedExampleShoppingListItems() {
    const insertedExampleShoppingListItems = await Promise.all(
        shoppingListItemsSeed.map(
            (item) =>
                sql`
                INSERT INTO shopping_lists_join_items (list_id, item_template_id, item_name, item_notes, default_units, amount, checked_off, created_at, updated_at)
                VALUES (
                    ${item.list_id},
                    ${item.item_template_id},
                    ${item.item_name},
                    ${item.item_notes},
                    ${item.default_units},
                    ${item.amount},
                    ${item.checked_off},
                    ${new Date().toISOString()},
                    ${new Date().toISOString()}
                );
            `
        )
    );
    return insertedExampleShoppingListItems;
}

async function seedExampleShoppingListUsers() {
    const insertedExampleShoppingListUsers = await Promise.all(
        shoppingListUsersSeed.map(
            (listUser) =>
                sql`
                    INSERT INTO shopping_lists_join_users (user_id, list_id, user_role, is_pinned, created_at, updated_at)
                    VALUES (
                        ${listUser.user_id},
                        ${listUser.list_id},
                        ${listUser.user_role},
                        ${listUser.is_pinned},
                        ${new Date().toISOString()},
                        ${new Date().toISOString()}
                    );
                `
        )
    );
    return insertedExampleShoppingListUsers;
}

export async function GET() {
    try {
        await seedGlobalItemTemplates();
        await seedExampleUsers();
        await seedExampleShoppingLists();
        await seedExampleUserItemTemplates();
        await seedExampleShoppingListItems();
        await seedExampleShoppingListUsers();
        return Response.json( { messsage: 'Data seeded successfully' } )
    } catch (error) {
        return Response.json( { error: String(error) }, { status: 500 })
    }
}