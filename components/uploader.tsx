"use client";

import { useState } from "react";
import { UploadDropzone } from "@uploadthing/react";
import Image from "next/image";
import { OurFileRouter } from "@/app/api/uploadthing/core";

interface UploaderProps {
  onChange: (urls: string[]) => void;
  value: string[];
}

export function Uploader({ onChange, value }: UploaderProps) {
  return (
    <div className="space-y-4">
      <UploadDropzone<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        onClientUploadComplete={(res) => onChange(res.map((f) => f.url))}
        onUploadError={(error) => alert(error.message)}
      />

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((url) => (
            <div key={url} className="relative aspect-square">
              <Image src={url} alt="preview" fill className="rounded object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}