"use server";

import R2 from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

export async function getUploadUrl(fileName: string, fileType: string) {
  try {
    // Genera un nome file unico per evitare sovrascritture
    const uniqueFileName = `${uuidv4()}-${fileName.replace(/\s+/g, "-")}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: uniqueFileName,
      ContentType: fileType,
    });

    // Genera l'URL firmato (valido per 60 secondi)
    const signedUrl = await getSignedUrl(R2, command, { expiresIn: 60 });

    return {
      success: true,
      url: signedUrl,
      fileKey: uniqueFileName, // Questo lo salveremo nel DB Supabase
      publicUrl: `${process.env.NEXT_PUBLIC_R2_DOMAIN}/${uniqueFileName}`
    };
  } catch (error) {
    console.error("Error generating upload URL:", error);
    return { success: false, error: "Failed to generate upload URL" };
  }
}
