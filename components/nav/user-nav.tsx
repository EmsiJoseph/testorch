import Image from "next/image"
import Link from "next/link"

import { appClient } from "@/lib/auth0/auth0"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export async function UserNav() {
  const session = await appClient.getSession()

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage
                  src={session?.user.picture || "/avatar.svg"}
                  alt="User avatar"
              />
              <AvatarFallback>
                <Image
                    className="grayscale"
                    src="/avatar.svg"
                    alt="User avatar"
                    width={36}
                    height={36}
                />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              {/* Truncate the name if it overflows */}
              <p className="text-sm font-medium leading-none truncate">
                {session?.user.name}
              </p>
              {/* Truncate the email if it overflows */}
              <p className="text-xs leading-none text-muted-foreground truncate">
                {session?.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/account/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/api/auth/logout">Log Out</a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
