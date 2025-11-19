import { sql } from "@/lib/postgresSql";
import { dropAllTables } from "@/db/db-reset";

export async function GET() {
  try {
    await sql.begin(() => [dropAllTables()]);
    return Response.json({ message: "Database successfully deleted" });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
