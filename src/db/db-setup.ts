import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function setupUsersTable() {
    await sql`
        CREATE TABLE IF NOT EXISTS users (
            user_id         UUID                 DEFAULT uuid_generate_v4() PRIMARY KEY,
            email           CITEXT      NOT NULL UNIQUE,
            hashed_password TEXT        NOT NULL,
            created_at      TIMESTAMPTZ NOT NULL
        );
    `
    return true;
}

async function setupShoppingListsTable() {
    
        await sql`
            CREATE TABLE IF NOT EXISTS shopping_lists (
                list_id    UUID                 DEFAULT uuid_generate_v4() PRIMARY KEY,
                list_name  TEXT        NOT NULL,
                is_public  BOOLEAN     NOT NULL DEFAULT FALSE,
                created_at TIMESTAMPTZ NOT NULL,
                updated_at TIMESTAMPTZ NOT NULL
            );
        `
    return true;
}

async function setupItemTemplatesTable() {
    await sql`CREATE TABLE IF NOT EXISTS item_templates (
                item_template_id      UUID                  DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id               UUID                  REFERENCES users(user_id) ON DELETE RESTRICT,
                item_name             TEXT        NOT NULL,
                default_unit          VARCHAR(16) NOT NULL DEFAULT 'units',
                is_global             BOOLEAN     NOT NULL DEFAULT FALSE,
                CHECK (is_global = (user_id IS NULL))
            );
        `;
    
    
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS ux_global_name 
                ON item_templates (lower(item_name)) 
                WHERE is_global = TRUE;
        `;
    
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS ux_user_name
                ON item_templates (user_id, lower(item_name))
                WHERE is_global = FALSE;
        `;
    
    await sql`CREATE INDEX IF NOT EXISTS ix_templates_user
                ON item_templates (user_id)
                WHERE is_global = FALSE;
        `;
    
    return true;
    
}

async function setupShoppingListsJoinItemTemplatesTable() {
    await sql`CREATE TABLE IF NOT EXISTS shopping_lists_join_items (
                list_item_id UUID                    DEFAULT uuid_generate_v4() PRIMARY KEY,
                list_id      UUID           NOT NULL REFERENCES shopping_lists(list_id) ON DELETE CASCADE,
                template_id  UUID                    REFERENCES item_templates(item_template_id) ON DELETE SET NULL,
                item_name    TEXT           NOT NULL,
                units_name   VARCHAR(16)    NOT NULL DEFAULT 'units',
                amount       NUMERIC(10, 2) NOT NULL DEFAULT 1 CHECK (amount >= 0),
                checked_off  BOOLEAN        NOT NULL DEFAULT FALSE,
                created_at   TIMESTAMPTZ    NOT NULL,
                updated_at   TIMESTAMPTZ    NOT NULL
            );
        `
    
    await sql`CREATE INDEX IF NOT EXISTS ix_join_items_list 
                ON shopping_lists_join_items(list_id);
        `;
    
    return true;
}

async function setupShoppingListsJoinUsersTable() {
    await sql`
        DO $$
        BEGIN
        IF NOT EXISTS (
            SELECT 1
            FROM pg_type
            WHERE typname = 'shopping_list_user_role_type'
        ) THEN
            CREATE TYPE shopping_list_user_role_type AS ENUM ('owner', 'editor', 'viewer');
        END IF;
        END
        $$;
    `;
        
    await sql`CREATE TABLE IF NOT EXISTS shopping_lists_join_users (
                user_id   UUID                         NOT NULL REFERENCES users(user_id)          ON DELETE CASCADE,
                list_id   UUID                         NOT NULL REFERENCES shopping_lists(list_id) ON DELETE CASCADE,
                user_role shopping_list_user_role_type NOT NULL,
                is_pinned BOOLEAN                      NOT NULL DEFAULT FALSE,
                PRIMARY KEY (user_id, list_id)
            );
        `;
        
    await sql`
            CREATE INDEX IF NOT EXISTS ix_join_users_list 
                ON shopping_lists_join_users(list_id);
        `;
    return true;
}

export async function setupAllTables() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`CREATE EXTENSION IF NOT EXISTS "citext";`

    await sql.begin(() => [
        setupUsersTable(),
        setupShoppingListsTable(),
        setupItemTemplatesTable(),
        setupShoppingListsJoinItemTemplatesTable(),
        setupShoppingListsJoinUsersTable()
    ]);
}