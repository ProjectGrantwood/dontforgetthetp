import { setupAllTables } from '@/db/db-setup';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
    try {
        await sql.begin( () => [ setupAllTables() ]);
        return Response.json( { messsage: 'Database successfully created' } )
    } catch (error) {
        return Response.json( { error: String(error) }, { status: 500 })
    }
}

