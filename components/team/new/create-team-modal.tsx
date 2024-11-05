import {useState} from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {PlusCircledIcon} from "@radix-ui/react-icons";
import {Input} from "@/components/ui/input";
import {Code} from "@/components/common/code";
import slugify from "@sindresorhus/slugify";
import {SubmitButton} from "@/components/common/submit-button";
import {useUser} from "@auth0/nextjs-auth0/client";
import {createOrganization} from "@/app/onboarding/create/actions";
import {toast} from "sonner";
import {createInfluxDbOrganization} from "@/components/team/new/actions";
import {handleClientSideApiResponse, IClientSideApiHandlerResponse} from "@/lib/handle-client-side-api-response";

export const CreateTeamModal = () => {
    const {user} = useUser()
    const [teamName, setTeamName] = useState("");

    return (
        <Dialog>
            <DialogTrigger className="w-full h-full" asChild>
                <Button variant="ghost" className="w-full justify-start h-full">
                    <PlusCircledIcon className="mr-2 h-4 w-4"/>
                    Create Team
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md rounded-lg p-6">
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-3xl">Create a team</DialogTitle>
                    <DialogDescription>
                        Continue to start collaborating with increased usage, additional security features, and support.
                    </DialogDescription>
                </DialogHeader>

                <form
                    action={async (formData: FormData) => {
                        // const res = await createInfluxDbOrganization(formData)
                        // const responseData: IClientSideApiHandlerResponse = {
                        //     message: res?.message,
                        //     success: res?.success,
                        // }
                        // handleClientSideApiResponse(responseData)

                        const {error} = await createOrganization(formData)
                        if (error) {
                            toast.error(error)
                            return
                        }

                    }}
                    className="space-y-6"
                >
                    {/* Hidden email field */}
                    <input type="hidden" name="email" value={user?.email || ""}/>

                    {/* Team Name Input */}
                    <div className="space-y-2">
                        <label htmlFor="team-name" className="block text-sm font-medium text-foreground">
                            Team Name
                        </label>
                        <Input
                            id="organization_name"
                            name="organization_name"
                            value={teamName}
                            autoFocus
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect="off"
                            required
                            placeholder="Acme Corp"
                            onChange={(e) => setTeamName(e.target.value)}
                            className="w-full bg-field dark:bg-neutral-950"
                        />
                        <p className="text-sm text-muted-foreground">
                            Slug: <Code>{slugify(teamName || "Acme Corp")}</Code>
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 flex justify-between">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <SubmitButton>
                            Continue
                        </SubmitButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
