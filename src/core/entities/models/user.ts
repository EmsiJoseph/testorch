import {z} from "zod";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {users} from "@/drizzle/schema";

export const userSchema = createSelectSchema(
    users
).omit({
    createdAt:true,
    updatedAt: true,
});

export const newUserSchema = createInsertSchema(users, {
    email: (schema) => schema.email.email(),
    password_hash: (schema) => schema.password_hash.min(8),
}).omit({
    createdAt: true,
    updatedAt: true,
})

export const signInSchema = createInsertSchema(users, {
    email: (schema) => schema.email.email(),
    password_hash: (schema) => schema.password_hash.min(8).max(31),
}).omit({
    id: true,
    first_name: true,
    last_name: true,
    createdAt: true,
    updatedAt: true,
})



export type User = z.infer<typeof userSchema>;

export type NewUser = z.infer<typeof newUserSchema>;
