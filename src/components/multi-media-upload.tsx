"use client";

import React, { useCallback, useState } from "react";
import { FileWithPreview } from "@/types/types"; // we'll define this below
import { useDropzone } from "react-dropzone";
import { X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MultiMediaUploadProps {
  value?: string[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: {
    'image/*': string[];
    'video/*': string[];
  };
  className?: string;
}

export const MultiMediaUpload = ({
  value = [],
  onChange,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    'video/*': ['.mp4', '.mov', '.avi', '.mkv']
  },
  className,
}: MultiMediaUploadProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setLoading(true);
      try {
        // Create preview URLs for accepted files
        const newFiles = acceptedFiles.map((file) => ({
          ...file,
          preview: URL.createObjectURL(file),
          type: file.type.startsWith('image/') ? 'image' : 'video'
        }));

        // Update state with new files
        setFiles((currentFiles) => {
          const updatedFiles = [...currentFiles, ...newFiles].slice(0, maxFiles);
          // Trigger onChange with actual File objects
          onChange(updatedFiles);
          return updatedFiles;
        });
      } catch (error) {
        console.error('Error processing files:', error);
      } finally {
        setLoading(false);
      }
    },
    [maxFiles, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: maxFiles - files.length,
  });

  const removeFile = (index: number) => {
    setFiles((currentFiles) => {
      const newFiles = [...currentFiles];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      onChange(newFiles);
      return newFiles;
    });
  };

  // Cleanup previews when component unmounts
  React.useEffect(() => {
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, []);

  const renderPreview = (file: FileWithPreview, index: number) => {
    const isImage = file.type === 'image';

    return (
      <div key={index} className="relative">
        <div className="relative aspect-square rounded-md overflow-hidden border">
          {isImage ? (
            <Image
              src={file.preview}
              alt="Preview"
              className="object-cover"
              fill
            />
          ) : (
            <video
              src={file.preview}
              className="w-full h-full object-cover"
              controls
            />
          )}
          <button
            type="button"
            onClick={() => removeFile(index)}
            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive && "border-primary bg-primary/10",
          "hover:border-primary"
        )}
      >
        <input {...getInputProps()} />
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Upload className="h-8 w-8 mb-2" />
            <p className="text-sm text-gray-600">
              Drag & drop files here, or click to select
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supports images (PNG, JPG, GIF) and videos (MP4, MOV, AVI) up to {maxSize / 1024 / 1024}MB
            </p>
            <p className="text-xs text-gray-500">
              Maximum {maxFiles} files
            </p>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file, index) => renderPreview(file, index))}
        </div>
      )}
    </div>
  );
};