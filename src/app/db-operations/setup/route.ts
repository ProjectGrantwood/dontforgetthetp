import { sql } from "@/lib/connections/postgresSql";
import { setupAllTables } from "@/db/db-setup";

export async function GET() {
  try {
    await sql.begin(() => [setupAllTables()]);
    return Response.json({ messsage: "Database successfully created" });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
