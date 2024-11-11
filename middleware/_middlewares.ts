import { type MiddlewareFunctionProps } from "@rescale/nemo"
import { NextResponse } from "next/server"

import { appClient } from "@/lib/auth0/auth0"

export const notFoundMiddleware = async ({
  request,
}: MiddlewareFunctionProps) => {
  const referer = request.headers.get("referer")
  const requestUrl = request.url
  const redirectUrl = referer ? new URL(referer) : new URL("/", requestUrl)
  return NextResponse.redirect(redirectUrl)
}

export const authMiddleware = async ({ request }: MiddlewareFunctionProps) => {
  const session = await appClient.getSession()
  const referer = request.headers.get("referer")
  const requestUrl = request.url
  const redirectUrl = referer ? new URL(referer) : new URL("/", requestUrl)

  if (session?.user) {
    return NextResponse.next()
  }

  return NextResponse.redirect(redirectUrl)
}
