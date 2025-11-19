import postgres from "postgres";

export const sql = postgres(process.env.POSTGRES_URL!, {
  prepare: false,
  ssl: "require",
});
