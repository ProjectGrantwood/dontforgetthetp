import { sql } from "@/lib/connections/preparedPostgresSql";

async function setupShoppingListsTable() {
  await sql`
            CREATE TABLE IF NOT EXISTS shopping_lists (
                list_id    UUID                    DEFAULT uuid_generate_v4() PRIMARY KEY,
                list_name  TEXT           NOT NULL,
                list_notes TEXT,
                item_count NUMERIC(10, 0) NOT NULL,
                is_public  BOOLEAN        NOT NULL DEFAULT FALSE,
                created_at TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ    NOT NULL DEFAULT NOW()
            );
        `;
}

async function setupItemTemplatesTable() {
  await sql`CREATE TABLE IF NOT EXISTS item_templates (
                item_template_id      UUID                  DEFAULT uuid_generate_v4() PRIMARY KEY,
                item_name             TEXT        NOT NULL,
                default_units         VARCHAR(16) NOT NULL  DEFAULT 'units',
                created_at            TIMESTAMPTZ NOT NULL  DEFAULT NOW(),
                updated_at            TIMESTAMPTZ NOT NULL  DEFAULT NOW()
            );
        `;
}

async function setupShoppingListsJoinItemTemplatesTable() {
  await sql`CREATE TABLE IF NOT EXISTS shopping_lists_join_items (
                list_item_id     UUID                    DEFAULT uuid_generate_v4() PRIMARY KEY,
                list_id          UUID           NOT NULL REFERENCES shopping_lists(list_id) ON DELETE CASCADE,
                item_name        TEXT           NOT NULL,
                item_notes       TEXT,
                default_units    VARCHAR(16)    NOT NULL DEFAULT 'units',
                amount           NUMERIC(10, 2) NOT NULL DEFAULT 1 CHECK (amount >= 0),
                checked_off      BOOLEAN        NOT NULL DEFAULT FALSE,
                created_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
                updated_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW()
            );
        `;

  await sql`CREATE INDEX IF NOT EXISTS ix_join_items_list 
                ON shopping_lists_join_items(list_id);
        `;
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
                user_id    TEXT                         NOT NULL REFERENCES neon_auth.users_sync(id) ON DELETE CASCADE,
                list_id    UUID                         NOT NULL REFERENCES shopping_lists(list_id)  ON DELETE CASCADE,
                user_role  shopping_list_user_role_type NOT NULL,
                is_pinned  BOOLEAN                      NOT NULL DEFAULT FALSE,
                created_at TIMESTAMPTZ                  NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ                  NOT NULL DEFAULT NOW(),
                PRIMARY KEY (user_id, list_id)
              );
        `;

  await sql`
            CREATE INDEX IF NOT EXISTS ix_join_users_list 
                ON shopping_lists_join_users(list_id);
        `;
}

export async function setupShoppingSessionsTable() {
  await sql`CREATE TABLE IF NOT EXISTS shopping_sessions (
              list_id    UUID        NOT NULL REFERENCES shopping_lists(list_id)  ON DELETE RESTRICT,
              user_id    TEXT        NOT NULL REFERENCES neon_auth.users_sync(id) ON DELETE RESTRICT,
              started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
              ended_at   TIMESTAMPTZ
            );
    `;
}

export async function setupUserRelationshipsTable() {
  await sql`
        DO $$
        BEGIN
        IF NOT EXISTS (
            SELECT 1
            FROM pg_type
            WHERE typname = 'user_relationship_status_type'
        ) THEN
            CREATE TYPE user_relationship_status_type AS ENUM ('pending', 'accepted', 'blocked');
        END IF;
        END
        $$;
    `;

  await sql`CREATE TABLE IF NOT EXISTS user_relationships (
              user_id_1                 TEXT                          NOT NULL REFERENCES neon_auth.users_sync(id) ON DELETE CASCADE,
              user_id_2                 TEXT                          NOT NULL REFERENCES neon_auth.users_sync(id) ON DELETE CASCADE,
              status                    user_relationship_status_type NOT NULL DEFAULT 'pending',
              prev_status               user_relationship_status_type,
              user_initiating_action_id TEXT                          NOT NULL REFERENCES neon_auth.users_sync(id) ON DELETE CASCADE,
              created_at                TIMESTAMPTZ                   NOT NULL DEFAULT NOW(),
              updated_at                TIMESTAMPTZ                   NOT NULL DEFAULT NOW()
            );
    `;

  await sql`
    CREATE UNIQUE INDEX idx_unique_relationship 
    ON user_relationships (user_id_1, user_id_2);
  `;
}

export async function setupAllTables() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`CREATE EXTENSION IF NOT EXISTS "citext";`;

  await sql.begin(() => [
    setupShoppingListsTable(),
    setupItemTemplatesTable(),
    setupShoppingListsJoinItemTemplatesTable(),
    setupShoppingListsJoinUsersTable(),
    setupShoppingSessionsTable(),
    setupUserRelationshipsTable(),
  ]);
}
