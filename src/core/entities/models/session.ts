import {z} from "zod";
import {createSelectSchema} from "drizzle-zod";
import {sessions} from "@/drizzle/schema";

export const sessionSchema = createSelectSchema(
    sessions
)

export type Session = z.infer<typeof sessionSchema>;
