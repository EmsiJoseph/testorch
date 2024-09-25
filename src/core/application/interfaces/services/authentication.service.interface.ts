import {Session} from "@/core/entities/models/session";
import {User} from "@/core/entities/models/user";
import {Cookie} from "@/core/entities/models/cookie";

export interface IAuthenticationService {
    generateUserId(): string;
    validateSession(
        sessionId: Session["id"],
    ): Promise<{ user: User; session: Session }>;
    createSession(user: User): Promise<{ session: Session; cookie: Cookie }>;
    invalidateSession(sessionId: Session["id"]): Promise<{ blankCookie: Cookie }>;
}
