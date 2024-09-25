
import {DrizzlePostgreSQLAdapter} from "@lucia-auth/adapter-drizzle";
// import {drizzle, PostgresJsDatabase} from "drizzle-orm/postgres-js";
import {drizzle} from "drizzle-orm/vercel-postgres"
import {sql} from "@vercel/postgres";
import postgres from "postgres";

import "@/app/config/config"
import * as schema from "./schema";

// declare global {
//     // eslint-disable-next-line no-var -- only var works here
//     var db: PostgresVercel<typeof schema> | undefined;
// }
//
// let db: PostgresJsDatabase<typeof schema>;
//
// if (process.env.NODE_ENV === "production") {
//     db = drizzle(postgres(process.env.NEXT_PUBLIC_DATABASE_URL!), {schema});
// } else {
//     if (!global.db) {
//         global.db = drizzle(postgres(process.env.NEXT_PUBLIC_DATABASE_URL!), {schema});
//     }
//     db = global.db;
// }
//
// export {db};

export const db = drizzle(sql, {schema});

// Setup lucia adapter
export const luciaAdapter = new DrizzlePostgreSQLAdapter(db, schema.sessions, schema.users);
