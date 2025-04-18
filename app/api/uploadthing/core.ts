import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  postImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await getServerSession(authOptions); // Get the session
      const userId = session?.user?.id;

      if (!userId) throw new Error("Unauthorized");

      console.log("UserId:", userId);
      return { userId };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("onUploadComplete triggered", file);
      try {
        console.log("Upload complete. File object:", file);
        return { fileUrl: file.url };
      } catch (error) {
        console.error("Error in onUploadComplete:", error);
        throw error;
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
