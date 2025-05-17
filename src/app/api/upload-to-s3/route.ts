import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';

// AWS S3 config
const s3 = new AWS.S3({
  accessKeyId: process.env.MYAPP_AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.MYAPP_AWS_SECRET_ACCESS_KEY!,
  region: process.env.MYAPP_AWS_REGION!,
});

// Convert File to Buffer
async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// POST handler
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = await fileToBuffer(file);

  const fileName = file.name || `upload-${Date.now()}`;
  const key = `v-neck-men-by-user/${fileName}`;

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  };

  try {
    await s3.upload(uploadParams).promise();

    const publicUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.MYAPP_AWS_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({
      message: 'Upload successful',
      url: publicUrl,
      key: key,
    });
  } catch (err) {
    console.error('S3 Upload Error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
