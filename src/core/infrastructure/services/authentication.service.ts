import { generateIdFromEntropySize, Lucia } from "lucia";

import { luciaAdapter } from "@/drizzle";
import {Cookie} from "@/core/entities/models/cookie";
import {IAuthenticationService} from "@/core/application/interfaces/services/authentication.service.interface";
import {IUsersRepository} from "@/core/application/interfaces/repositories/users.repository.interface";
import {SESSION_COOKIE} from "@/app/constants/session-cookie.constant";
import {User} from "@/core/entities/models/user";
import {Session, sessionSchema} from "@/core/entities/models/session";
import {UnauthenticatedError} from "@/core/entities/errors/auth";

export class AuthenticationService implements IAuthenticationService {
    private _lucia: Lucia;

    constructor(
        private _usersRepository: IUsersRepository,
    ) {
        this._lucia = new Lucia(luciaAdapter, {
            sessionCookie: {
                name: SESSION_COOKIE,
                expires: false,
                attributes: {
                    secure: process.env.NODE_ENV === "production",
                },
            },
            getUserAttributes: (attributes) => {
                return {
                   email: attributes.email,
                };
            },
        });
    }

    async validateSession(
        sessionId: string,
    ): Promise<{ user: User; session: Session }> {
                const result = await this._lucia.validateSession(sessionId)

                if (!result.user || !result.session) {
                    throw new UnauthenticatedError("Unauthenticated");
                }

                const user = await this._usersRepository.getUser(result.user.id);

                if (!user) {
                    throw new UnauthenticatedError("User doesn't exist");
                }

                return { user, session: result.session };
    }

    async createSession(
        user: User,
    ): Promise<{ session: Session; cookie: Cookie }> {
                const luciaSession = this._lucia.createSession(user.id, {})

                const session = sessionSchema.parse(luciaSession);
                const cookie =  this._lucia.createSessionCookie(session.id)

                return { session, cookie };
    }

    async invalidateSession(sessionId: string): Promise<{ blankCookie: Cookie }> {
        await this._lucia.invalidateSession(sessionId)

        const blankCookie = this._lucia.createBlankSessionCookie();

        return { blankCookie };
    }

    generateUserId(): string {
        return generateIdFromEntropySize(10)
    }
}

interface DatabaseUserAttributes {
    email: string
}

declare module "lucia" {
    interface Register {
        Lucia: Lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}
