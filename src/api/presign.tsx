import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { v4 as uuid } from "uuid"

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export default async function handler(req: any, res: any) {
  try {
    const { fileType } = req.body

    const fileName = `${uuid()}.jpg`

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    })

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 60,
    })

    const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`

    res.status(200).json({
      uploadUrl,
      imageUrl,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: "Error generating signed URL",
    })
  }
}
