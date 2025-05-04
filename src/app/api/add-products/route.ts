import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { createCategory, updateCategory } from '../../../../helpers/products';

const s3 = new S3Client({
  region: process.env.MYAPP_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.MYAPP_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.MYAPP_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    console.log('📥 Receiving form data...');
    const formData = await req.formData();

    const _id = formData.get('_id')?.toString();
    const title = formData.get('title')?.toString();
    const description = formData.get('description')?.toString();
    const priority = parseInt(formData.get('priority') as string);
    const active = formData.get('active') === 'true';
    const type = formData.get('type')?.toString();
    const price = parseFloat(formData.get('price') as string);
    const sizes = JSON.parse(formData.get('sizes') as string);
    const colors = JSON.parse(formData.get('colors') as string);
    const thumbnailIndex = parseInt(formData.get('thumbnailIndex') as string);
    const collectionId = formData.get('collectionId')?.toString();

    console.log('📝 Parsed Form Inputs:', {
      _id,
      title,
      description,
      priority,
      active,
      type,
      price,
      sizes,
      colors,
      thumbnailIndex,
      collectionId,
    });

    const imageFiles = formData.getAll('images[]');
    const imageUrls: string[] = [];

    console.log('🖼️ Number of image files:', imageFiles.length);

    for (const image of imageFiles) {
      if (typeof image === 'string') {
        console.log('🔗 Using existing image URL:', image);
        if (image.startsWith('https://')) {
          imageUrls.push(image);
        } else {
          console.error('❌ Invalid image string format:', image);
          return NextResponse.json({ error: 'Invalid image string format' }, { status: 400 });
        }
      } else if (image && typeof (image as any).arrayBuffer === 'function') {
        const file = image as Blob;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const fileName = (file as any).name || `upload-${Date.now()}`;
        const ext = fileName.split('.').pop() || 'jpg';
        const key = `products/${uuidv4()}.${ext}`;

        console.log('📤 Uploading to S3:', key);

        const uploadCommand = new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: key,
          Body: buffer,
          ContentType: (file as any).type || 'application/octet-stream',
        });

        await s3.send(uploadCommand);

        const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.MYAPP_AWS_REGION}.amazonaws.com/${key}`;
        console.log('✅ Uploaded image URL:', url);
        imageUrls.push(url);
      } else {
        console.error('❌ Invalid image format:', image);
        return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
      }
    }

    const productata = {
      title,
      description,
      priority: Number(priority),
      active,
      type,
      price: Number(price),
      sizes: Array.isArray(sizes) ? sizes : [],
      colors: Array.isArray(colors) ? colors : [],
      image_urls: imageUrls,
      thumbnail_url: imageUrls[thumbnailIndex] || imageUrls[0] || '',
      collectionId,
    };

    console.log('📦 Final Product Data:', productata);

    const result = _id
      ? await updateCategory(_id, productata)
      : await createCategory(productata);

    console.log('✅ DB Operation Result:', result);

    return NextResponse.json({
      message: 'Category processed successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Server error' },
      { status: 500 }
    );
  }
}
