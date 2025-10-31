import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES.URL!, { ssl: 'require' });

async function setupUsersTable() {
    await sql`
        CREATE TABLE IF NOT EXISTS users (
            user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            display_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            hashed_password TEXT NOT NULL,
            timestamp_account_created TIMESTAMP NOT NULL
        );
    `
}

async function setupShoppingListsTable() {
    await sql`
        CREATE TABLE IF NOT EXISTS shopping_lists (
            shopping_list_id uuid_generate_v4() PRIMARY KEY,
            list_name VARCHAR(255) NOT NULL,
            is_public BOOLEAN DEFAULT false
            timestamp_list_created TIMESTAMPTZ NOT NULL
        );
    `
}

async function setupUserItemTemplatesTable() {
    await sql`
        CREATE TABLE IF NOT EXISTS user_item_templates (
            user_item_template_id uuid_generate_v4() PRIMARY KEY,
            user_id UUID NOT NULL,
            item_name VARCHAR(255) NOT NULL,
            default_units VARCHAR(16) DEFAULT "units" NOT NULL
        );
    `
}

async function setupShoppingListsJoinItemsTable() {
    await sql`
        CREATE TABLE IF NOT EXISTS shopping_lists_join_items (
            item_id UUID NOT NULL,
            user_id UUID NOT NULL,
            item_name VARCHAR(255) NOT NULL,
            units_name VARCHAR(16) DEFAULT "units" NOT NULL,
            checked_off BOOLEAN DEFAULT false
        );
    `
}

async function setupShoppingListsJoinUsersTable() {
    await sql`
        CREATE TYPE IF NOT EXISTS shopping_list_user_role_type AS ENUM ('owner', 'editor', 'viewer');
    `;
    await sql`
        CREATE TABLE IF NOT EXISTS shopping_lists_join_users (
            user_id UUID NOT NULL,
            list_id UUID NOT NULL,
            user_role shopping_list_user_role_type NOT NULL
        );
    `
}

async function setupAllTables() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const result = await sql.begin((sql) => [
        setupUsersTable(),
        setupShoppingListsTable(),
        setupUserItemTemplatesTable(),
        setupShoppingListsJoinItemsTable(),
        setupShoppingListsJoinUsersTable(),
    ]);
    return true;
}

export default async function GET() {
    try {
        await setupAllTables();
        return Response.json({ message: 'Database setup succesfully' });
    } catch (error) {
        return Response.json({ error }, { status: 500 })
    }
}