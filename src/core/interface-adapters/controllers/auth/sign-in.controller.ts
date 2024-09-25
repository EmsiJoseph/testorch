import {z} from "zod";
import newrelic from "newrelic";
import {Cookie} from "@/core/entities/models/cookie";
import {InputParseError} from "@/core/entities/errors/common";
import {signInUseCase} from "@/core/application/use-cases/auth/sign-in.use-case";
import {signInSchema} from "@/core/entities/models/user";
import {UsersRepository} from "@/core/infrastructure/repositories/users.repository";


export async function signInController(
    input: Partial<z.infer<typeof signInSchema>>,
    usersRepository: UsersRepository = new UsersRepository(),
): Promise<Cookie> {
    return await newrelic.startSegment("signInController", true, async () => {
        const {data, error: inputParseError} = signInSchema.safeParse(input);

        if (inputParseError) {
            throw new InputParseError("Invalid data", {cause: inputParseError});
        }

        const {cookie} = await signInUseCase(data, usersRepository);
        return cookie;
    })
}
