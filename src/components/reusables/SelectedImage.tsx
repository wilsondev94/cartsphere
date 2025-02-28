"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { ImageType } from "@/types";

interface SelectedImageProps {
  item?: ImageType;
  handleFileChange: (value: File) => void;
}
export default function SelectedImage({
  item,
  handleFileChange,
}: SelectedImageProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) handleFileChange(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png"] },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-slate-400 border-dashed p-2 cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drag and drop image here.</p>
      ) : (
        <p>{item?.color} Image</p>
      )}
    </div>
  );
}
