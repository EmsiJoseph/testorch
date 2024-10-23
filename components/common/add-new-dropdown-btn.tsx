"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {ChevronDownIcon} from "@radix-ui/react-icons"
import {useRouter} from "nextjs-toploader/app";
import {Plus} from "lucide-react";

export default function AddNewDropdownBtn() {
    const router = useRouter();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default" size="sm">
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New...
                    <ChevronDownIcon className="ml-2 h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 p-2">
                <DropdownMenuItem onSelect={() => {
                    router.push("/projects/new")
                }}>
                    Project
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => {
                    router.push("/tests/new")
                }}>
                    Test
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => {
                    router.push("/team/members  ")
                }}>
                    Team Member
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
