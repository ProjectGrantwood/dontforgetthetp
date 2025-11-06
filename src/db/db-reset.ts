import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function dropAllTables() {

    await sql`DROP INDEX IF EXISTS ux_global_name;`
    await sql`DROP INDEX IF EXISTS ix_join_items_list;`
    await sql`DROP INDEX IF EXISTS ix_join_users_list;`
    await sql`DROP INDEX IF EXISTS ix_templates_user;`
    await sql`DROP TABLE IF EXISTS shopping_lists_join_items;`
    await sql`DROP TABLE IF EXISTS shopping_lists_join_users;`
    await sql`DROP TABLE IF EXISTS shopping_lists;`
    await sql`DROP TABLE IF EXISTS item_templates;`
    await sql`DROP TABLE IF EXISTS users;`
    await sql`DROP TYPE IF EXISTS shopping_list_user_role_type;`
    
}