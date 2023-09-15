"use client";
import { UploadDropzone } from "@/lib/uploadThing";
import "@uploadthing/react/styles.css";
import { File, X } from "lucide-react";
import Image from "next/image";
interface FileUploadProps {
    onChange: (value?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";
}
export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image fill src={value} alt="upload" className="rounded-full" />
                <button onClick={() => onChange("")} className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm" type="button">
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    if (value && fileType === "pdf") {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <File className="h-10 fill-indigo-200 stroke-indigo-400 w-10" />
                <a href={value} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
                    {value}
                </a>
                <button onClick={() => onChange("")} className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm" type="button">
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone appearance={{
            label: "text-indigo-500 hover:text-indigo-500/90",
            button({ ready, isUploading }) {
                return `custom-button ${ready ? "bg-indigo-500" : ""} ${isUploading ? "bg-zinc-300 after:bg-indigo-500" : ""}`;
            },
            container: "border-2 border-indigo-800/60 rouded-md"
        }}
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.error(error);
            }}
        />
    )
}