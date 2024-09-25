import newrelic from "newrelic";
import {Cookie} from "@/core/entities/models/cookie";
import {InputParseError} from "@/core/entities/errors/common";
import {AuthenticationService} from "@/core/infrastructure/services/authentication.service";
import {UsersRepository} from "@/core/infrastructure/repositories/users.repository";
import {signOutUseCase} from "@/core/application/use-cases/auth/sign-out.use-case";

export async function signOutController(
  sessionId: string | undefined,
  usersRepository: UsersRepository = new UsersRepository(),
): Promise<Cookie> {
  return await newrelic.startSegment("signOutController", true, async () => {
    if (!sessionId) {
      throw new InputParseError("Must provide a session ID");
    }
    const authenticationService = new AuthenticationService(usersRepository);
    const { session } = await authenticationService.validateSession(sessionId);

    const { blankCookie } = await signOutUseCase(session.id, usersRepository);
    return blankCookie;
  })
}
