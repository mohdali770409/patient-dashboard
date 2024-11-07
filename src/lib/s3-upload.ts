import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(data: string): Promise<string> {
  // If the data is already an S3 URL, return it as-is
  if (data.startsWith('https://')) {
    return data;
  }

  try {
    // Extract the mime type and base64 content
    const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
      throw new Error("Invalid base64 string format");
    }

    const fileType = matches[1];
    const base64Content = matches[2];

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Content, "base64");

    // Generate a unique filename with the correct extension
    const extension = fileType.split("/")[1];
    const uniqueFileName = `patient-${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;

    // Create the command to upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: `patients/${uniqueFileName}`,
      Body: buffer,
      ContentType: fileType,
    });

    // Execute the upload
    await s3Client.send(command);

    // Return the public URL of the uploaded file
    return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/patients/${uniqueFileName}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
}