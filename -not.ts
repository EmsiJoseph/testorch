import { createMiddleware } from '@rescale/nemo';

import { authMiddleware, notFoundMiddleware } from "./middleware/_middlewares";

const globalMiddlewares = {
  before: authMiddleware,
}

const middlewares = {
  "/projects/[name]/execute": notFoundMiddleware
}

export const middleware = createMiddleware(middlewares, globalMiddlewares)

export const config = {
  matcher: [
    "/((?!.*\\..*|_next|public|public/.*|.*\\.css$).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
}
