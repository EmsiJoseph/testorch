import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

export default function UnderConstruction() {
    return (
        <div className="flex flex-1 flex-grow flex-col gap-4 lg:gap-6">
            <div className="flex flex-1 items-center justify-center ">
                <div className="flex max-w-[500px] flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        Page Under Construction 🚧👷‍♂️🏗️
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                        This page is currently under construction. We are working hard to bring you new features and improvements.
                    </p>
                    <p className="mt-3 text-muted-foreground">
                        Please check back later for updates or explore other parts of the platform.
                    </p>
                    <div className="mt-8">
                        <Link href="/public" className="w-full">
                            <Button className="w-full">
                                Go to Home
                                <ArrowRightIcon className="ml-2 size-4" />
                            </Button>
                        </Link>
                    </div>
                    <p className="mt-3 text-muted-foreground">
                        (We appreciate your patience!)
                    </p>
                </div>
            </div>
        </div>
    )
}
