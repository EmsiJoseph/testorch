import {eq} from "drizzle-orm";
import newrelic from 'newrelic'; // Import New Relic
import {db} from "@/drizzle";

import {users} from "@/drizzle/schema";
import {NewUser, User} from "@/core/entities/models/user";
import {IUsersRepository} from "@/core/application/interfaces/repositories/users.repository.interface";
import {DatabaseOperationError} from "@/core/entities/errors/common";

export class UsersRepository implements IUsersRepository {
    async getUser(id: string): Promise<User | undefined> {
        return await newrelic.startSegment("UsersRepository > getUser", true, async () => {
            try {
                const query = db.query.users.findFirst({
                    where: eq(users.id, id),
                });

                return await newrelic.startSegment(
                    query.toSQL().sql,
                    true,
                    async () => await query.execute()  // Execute the query while tracking it
                );
            } catch (err) {
                if (err instanceof Error) {
                    newrelic.noticeError(err); // Pass Error object to New Relic
                } else {
                    // Handle non-Error cases if necessary
                    newrelic.noticeError(new Error(String(err)));
                }
                throw err;
            }
        });
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        return await newrelic.startSegment("UsersRepository > getUserByEmail", true, async () => {
            try {
                const query = db.query.users.findFirst({
                    where: eq(users.email, email),
                });

                return await newrelic.startSegment(
                    query.toSQL().sql,
                    true,
                    async () => await query.execute()
                );
            } catch (err) {
                if (err instanceof Error) {
                    newrelic.noticeError(err); // Pass Error object to New Relic
                } else {
                    // Handle non-Error cases if necessary
                    newrelic.noticeError(new Error(String(err)));
                }
                throw err;
            }
        });
    }

    async createUser(input: NewUser): Promise<User>   {
        return await newrelic.startSegment("UsersRepository > createUser", true, async () => {
            try {
                const query = db.insert(users).values(input).returning();

                const [created] = await newrelic.startSegment(
                    "UsersRepository > createUser > query",
                    true,
                    async () => {
                        return await query.execute()
                    }
                )

                if (created) {
                    return created;
                } else {
                    throw new DatabaseOperationError("Cannot create user.");
                }

            } catch (err) {
                if (err instanceof Error) {
                    newrelic.noticeError(err); // Pass Error object to New Relic
                } else {
                    // Handle non-Error cases if necessary
                    newrelic.noticeError(new Error(String(err)));
                }
                throw err;
            }
        });
    }
}
