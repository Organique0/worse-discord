"use client";
import { UploadDropzone } from "@/lib/uploadThing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
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
    return (
        <UploadDropzone appearance={{ label: "text-indigo-500 hover:text-indigo-500/90", button: "bg-indigo-500/90", container: "border-2 border-indigo-800/60 rouded-md" }} endpoint={endpoint} onClientUploadComplete={(res) => {
            onChange(res?.[0].url);
        }}
            onUploadError={(error: Error) => {
                console.error(error);
            }}
        />
    )
}