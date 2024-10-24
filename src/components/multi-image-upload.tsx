import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { ImagePlus, X } from 'lucide-react';

interface MultiImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxFiles?: number;
}

export const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  value = [],
  onChange,
  maxFiles = 5,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Convert files to base64 strings
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            // Add new image while respecting maxFiles limit
            onChange([...value, e.target.result as string].slice(0, maxFiles));
          }
        };
        reader.readAsDataURL(file);
      });
    },
    [value, onChange, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: maxFiles - value.length,
  });

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Image Preview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {value.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`Upload ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full 
                opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Upload Area */}
      {value.length < maxFiles && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-colors duration-200 ease-in-out
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}
          `}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600">
              {isDragActive ? (
                <p>Drop the images here ...</p>
              ) : (
                <p>Drag & drop images here, or click to select</p>
              )}
            </div>
            <div className="text-xs text-gray-400">
              {`${value.length}/${maxFiles} images uploaded`}
            </div>
            <Button type="button" variant="outline" size="sm">
              Select Images
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
