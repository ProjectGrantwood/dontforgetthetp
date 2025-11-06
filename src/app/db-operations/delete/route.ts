import { dropAllTables } from '@/db/db-reset';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(){
    try {
        await sql.begin( () => [dropAllTables()]);
        return Response.json( { message: 'Database successfully deleted' } );
    } catch (error) {
        return Response.json( { error: String(error) }, { status: 500 } )
    }
}