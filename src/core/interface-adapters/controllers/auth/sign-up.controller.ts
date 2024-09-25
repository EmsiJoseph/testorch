import {z} from "zod";
import {signUpUseCase} from "@/core/application/use-cases/auth/sign-up.use-case";
import newrelic from "newrelic";
import {InputParseError} from "@/core/entities/errors/common";
import {UsersRepository} from "@/core/infrastructure/repositories/users.repository";

const inputSchema = z
    .object({
        first_name: z.string().min(3).max(31),
        last_name: z.string().min(3).max(31),
        email: z.string().min(3).max(31),
        password: z.string().min(6).max(31),
        confirm_password: z.string().min(6).max(31),
    })
    .superRefine(({password, confirm_password}, ctx) => {
        if (confirm_password !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ["password"],
            });
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ["confirmPassword"],
            });
        }
    });

export async function signUpController(
    input: Partial<z.infer<typeof inputSchema>>,
    usersRepository: UsersRepository = new UsersRepository(),
): Promise<ReturnType<typeof signUpUseCase>> {
    return await newrelic.startSegment("signUpController", true, async () => {
        const {data, error: inputParseError} = inputSchema.safeParse(input);

        if (inputParseError) {
            throw new InputParseError("Invalid data", {cause: inputParseError});
        }

        return await signUpUseCase(data, usersRepository);
    })
}
