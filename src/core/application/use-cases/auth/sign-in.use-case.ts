import newrelic from "newrelic";
import {verify} from "@node-rs/argon2";

import {Session} from "@/core/entities/models/session";
import {Cookie} from "@/core/entities/models/cookie";
import {AuthenticationService} from "@/core/infrastructure/services/authentication.service";
import {UsersRepository} from "@/core/infrastructure/repositories/users.repository";
import {AuthenticationError} from "@/core/entities/errors/auth";


export async function signInUseCase(input: {
                                        email: string;
                                        password_hash: string;
                                    },
                                    usersRepository: UsersRepository,
): Promise<{ session: Session; cookie: Cookie }> {
    return await newrelic.startSegment("signIn Use Case", true, async () => {
        const authenticationService = new AuthenticationService(usersRepository);

        const existingUser = await usersRepository.getUserByEmail(
            input.email,
        );

        if (!existingUser) {
            throw new AuthenticationError("User does not exist");
        }

        const validPassword = await newrelic.startSegment('verify password', true, async () => {
            return verify(existingUser.password_hash, input.password_hash, {
                memoryCost: 19456,
                timeCost: 2,
                outputLen: 32,
                parallelism: 1,
            })
        });

        if (!validPassword) {
            throw new AuthenticationError("Incorrect email or password");
        }

        return await authenticationService.createSession(existingUser);


    })


}