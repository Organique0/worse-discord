
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/dbClient";
const f = createUploadthing();

const handleAuth = async () => {
    const profile = await initialProfile();
    if (!profile) throw new Error("unauthenticated");
    return { userId: profile?.userId }
}
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } }).middleware(() => handleAuth()).onUploadComplete(() => { }),
    messageFile: f(["image", "pdf"]).middleware(() => handleAuth()).onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;