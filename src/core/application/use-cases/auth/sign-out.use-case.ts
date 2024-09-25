import {AuthenticationService} from "@/core/infrastructure/services/authentication.service";
import newrelic from "newrelic";
import {Cookie} from "@/core/entities/models/cookie";
import {IUsersRepository} from "@/core/application/interfaces/repositories/users.repository.interface";

export async function signOutUseCase(
    sessionId: string,
    usersRepository: IUsersRepository
): Promise<{ blankCookie: Cookie }> {
    return await newrelic.startSegment("signOut Use Case", true, async () => {
        const authenticationService = new AuthenticationService(usersRepository);

        return await authenticationService.invalidateSession(sessionId);
    })
}
