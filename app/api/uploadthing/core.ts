// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .middleware(async () => {
      const session = await auth();
      if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(({ file }) => ({
      uploadedBy: "user",
      url: file.url,
    })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;