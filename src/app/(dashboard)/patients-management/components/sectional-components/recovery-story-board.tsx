import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MultiImageUpload } from "@/components/multi-image-upload";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Video, X } from "lucide-react";
import { uploadToS3 } from "@/lib/s3-upload";
import {
  createUpdateRecoveryBoard,
  getSingleRecoveryUpdate,
} from "@/services/recovery-story-board.service";

interface StoryFormValues {
  // title: string;
  // description: string;
  images: string[];
  videos: string[];
  patientId: string;
}

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";

export const RecoveryStorySchema = z.object({
  // title: z
  //   .string()
  //   .min(1, "Title is required")
  //   .max(200, "Title must be less than 200 characters"),
  // description: z
  //   .string()
  //   .min(10, "Description must be at least 10 characters")
  //   .max(1000, "Description must be less than 1000 characters"),
  images: z.array(z.string().url("Invalid image URL")),
  videos: z.array(z.string().url("Invalid video URL")),
  patientId: z.string().min(1, "Patient ID is required"),
});

export type RecoveryStoryFormValues = z.infer<typeof RecoveryStorySchema>;

const RecoveryStoryBoard = ({ patientId }: { patientId: string }) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<RecoveryStoryFormValues>({
    resolver: zodResolver(RecoveryStorySchema),
    defaultValues: {
      // title: "",
      // description: "",
      images: [],
      videos: [],
      patientId: patientId,
    },
  });

  useEffect(() => {
    const fetchExistingStory = async () => {
      try {
        const existingStory = await getSingleRecoveryUpdate(patientId);

        if (existingStory) {
          form.reset({
            // title: existingStory.title || "",
            // description: existingStory.description || "",
            images: existingStory.images || [],
            videos: existingStory.videos || [],
            patientId: patientId,
          });
        }
      } catch (error) {
        console.error("Error fetching existing story:", error);
        toast({
          title: "Error fetching story",
          description: "Could not load existing story",
          variant: "destructive",
        });
      }
    };

    fetchExistingStory();
  }, [patientId, form.reset]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    try {
      setIsUploading(true);

      const uploadPromises = Array.from(files).map(async (file) => {
        // Validate file type and size
        if (!file.type.startsWith("image/")) {
          throw new Error("Only image files are allowed");
        }
        if (file.size > 10 * 1024 * 1024) {
          // 10MB limit
          throw new Error("Image file size should be less than 10MB");
        }

        const imageUrl = await uploadToS3(file);
        return imageUrl;
      });

      const imageUrls = await Promise.all(uploadPromises);
      const currentImages = form.getValues("images") || [];
      form.setValue("images", [...currentImages, ...imageUrls]);

      toast({
        title: "Images uploaded successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      toast({
        title: "Error uploading images",
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  const handleVideoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    try {
      setIsUploading(true);

      const uploadPromises = Array.from(files).map(async (file) => {
        // Check file size (e.g., limit to 100MB)
        if (file.size > 100 * 1024 * 1024) {
          throw new Error("Video file size should be less than 100MB");
        }

        const videoUrl = await uploadToS3(file);
        return videoUrl;
      });

      const videoUrls = await Promise.all(uploadPromises);
      const currentVideos = form.getValues("videos") || [];
      form.setValue("videos", [...currentVideos, ...videoUrls]);

      toast({
        title: "Videos uploaded successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error uploading videos:", error);
      toast({
        title: "Error uploading videos",
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset the file input
      event.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images");
    form.setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );
  };

  const removeVideo = (index: number) => {
    const currentVideos = form.getValues("videos");
    form.setValue(
      "videos",
      currentVideos.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: StoryFormValues) => {
    try {
      // Handle form submission here
      const response = await createUpdateRecoveryBoard({
        ...data,
        patientId,
      });
      if (response) {
        toast({
          title: "Story saved successfully",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error saving story",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full mx-auto p-8 bg-white shadow-lg rounded-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Recovery Story Board</h2>
        <p className="text-gray-600">Document the patient's recovery journey with photos and videos.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">Images</FormLabel>
                <FormControl>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary transition-colors">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                        disabled={isUploading}
                      />
                      <p className="text-sm text-gray-500 mt-2">Upload multiple images (max 10MB each)</p>
                    </div>

                    {field.value && field.value.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {field.value.map((url, index) => (
                          <div key={index} className="relative group rounded-xl overflow-hidden shadow-md">
                            <div className="aspect-square relative">
                              <a href={url} target="_blank" rel="noopener noreferrer">
                                <Image
                                  src={url}
                                  alt={`Uploaded image ${index + 1}`}
                                  fill
                                  className="object-cover transition-transform group-hover:scale-105"
                                />
                              </a>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600"
                              >
                                <X className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="videos"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">Videos</FormLabel>
                <FormControl>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary transition-colors">
                      <Input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={handleVideoUpload}
                        className="file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                        disabled={isUploading}
                      />
                      <p className="text-sm text-gray-500 mt-2">Upload multiple videos (max 100MB each)</p>
                    </div>

                    {field.value && field.value.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {field.value.map((url, index) => (
                          <div key={index} className="relative group rounded-xl overflow-hidden shadow-md bg-gray-100">
                            <div className="aspect-video relative">
                              <video
                                src={url}
                                controls
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => removeVideo(index)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600"
                              >
                                <X className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full py-6 text-lg font-medium transition-all duration-200 hover:scale-[1.02]" 
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Uploading...</span>
              </div>
            ) : (
              "Save Story"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default RecoveryStoryBoard;
