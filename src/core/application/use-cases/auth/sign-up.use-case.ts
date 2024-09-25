import {hash} from "@node-rs/argon2";
import {UsersRepository} from "@/core/infrastructure/repositories/users.repository";
import newrelic from "newrelic";
import {AuthenticationService} from "@/core/infrastructure/services/authentication.service";
import {Session} from "@/core/entities/models/session";
import {Cookie} from "@/core/entities/models/cookie";
import {NewUser, User} from "@/core/entities/models/user";
import {AuthenticationError} from "@/core/entities/errors/auth";

export async function signUpUseCase(input: {
                                        first_name: string;
                                        last_name: string;
                                        email: string;
                                        password: string;
                                    },
                                    usersRepository: UsersRepository
): Promise<{
    session: Session;
    cookie: Cookie;
    user: Pick<User, "id" | "email" | "first_name" | "last_name">;
}> {
    return await newrelic.startSegment("signUp UseCase", true, async () => {
        const user = await usersRepository.getUserByEmail(input.email);
        if (user) {
            throw new AuthenticationError("Email is already taken");
        }

        const passwordHash = await newrelic.startSegment('hash password', true, async () => {
            return hash(input.password, {
                memoryCost: 19456,
                timeCost: 2,
                outputLen: 32,
                parallelism: 1,
            });
        });

        const authenticationService = new AuthenticationService(usersRepository);
        const userId = authenticationService.generateUserId();

        // Ensure userId is not undefined
        if (!userId) {
            throw new Error("Failed to generate user ID");
        }

        const newUser: NewUser = {
            id: userId,
            first_name: input.first_name,
            last_name: input.last_name,
            email: input.email,
            password_hash: passwordHash,
        };

        const createdUser = await usersRepository.createUser(newUser);

        const {cookie, session} = await authenticationService.createSession(createdUser);

        return {
            session,
            cookie,
            user: {
                id: createdUser.id,              // Ensure id is string
                first_name: createdUser.first_name,
                last_name: createdUser.last_name,
                email: createdUser.email,
            },
        };
    });
}
