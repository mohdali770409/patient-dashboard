import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { MultiImageUpload } from "@/components/multi-image-upload";
import { uploadToS3 } from "@/lib/s3-upload";
import { useToast } from "@/hooks/use-toast";

const imagingTypes = [
  { name: "xray", label: "X-RAY" },
  { name: "ct", label: "CT" },
  { name: "cect", label: "CECT" },
  { name: "hrct", label: "HRCT" },
  { name: "mri", label: "MRI" },
  { name: "hsg", label: "HSG" },
  { name: "usg", label: "USG" },
  { name: "others", label: "Others" },
];

const ImagingComponent = () => {
  const { control, setValue } = useFormContext();
  const { toast } = useToast();

  const handleImageUpload = async (files: File[], type: string) => {
    try {
      const uploadPromises = files.map(async (file:any) => {
        const imageUrl = await uploadToS3(file);
        return imageUrl;
      });

      const imageUrls = await Promise.all(uploadPromises);
      setValue(`investigations.imaging.${type}.images`, imageUrls);
      
      toast({
        title: "Images uploaded successfully",
        variant: "default",
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Error uploading images",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-medium text-gray-400 mb-4">Imaging</h2>

      {imagingTypes.map((type) => (
        <div key={type.name} className="ml-4 space-y-4">
          <h3 className="font-medium text-gray-400 mb-3">{type.label}</h3>
          
          <FormField
            control={control}
            name={`investigations.imaging.${type.name}.report`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Report</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`Enter ${type.label} report details`}
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`investigations.imaging.${type.name}.images`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <MultiImageUpload
                    value={field.value}
                    onChange={(files:any) => handleImageUpload(files, type.name)}
                    maxFiles={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagingComponent;
