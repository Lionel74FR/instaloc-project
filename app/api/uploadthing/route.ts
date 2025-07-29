// app/api/uploadthing/route.ts
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

const handlers = createRouteHandler({
  router: ourFileRouter,
});

export const { GET, POST } = handlers;