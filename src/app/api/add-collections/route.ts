import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { createCategory, updateCategory } from "../../../../helpers/collections";


const s3 = new S3Client({
  region: process.env.MYAPP_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.MYAPP_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.MYAPP_AWS_SECRET_ACCESS_KEY!,
  },
});


export async function POST(req: NextRequest) {
  try {
    console.log('Receiving request...');
    const formData = await req.formData();
    console.log('FormData received.');


    const _id = formData.get('_id')?.toString(); // if present, we're updating
    const title = formData.get('title')?.toString();
    const description = formData.get('description')?.toString();
    const priority = parseInt(formData.get('priority') as string);
    const active = formData.get('active') === 'true';


    const image = formData.get('image');
    let imageUrl = '';


    if (typeof image === 'string' && image.startsWith('https://printeepal-collections-images.s3.us-east-1.amazonaws.com/tshirts')) {
      imageUrl = image;
      console.log('Reusing existing image URL:', imageUrl);
    } else if (image instanceof File) {
      console.log('Uploading new image file:', image.name);
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);


      const ext = image.name.split('.').pop();
      const key = `tshirts/${uuidv4()}.${ext}`;


      const uploadCommand = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: image.type,
      });


      await s3.send(uploadCommand);
      console.log('Upload successful.');


      imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.MYAPP_AWS_REGION}.amazonaws.com/${key}`;
    } else {
      console.error('Image is missing or invalid');
      return NextResponse.json({ error: 'Valid image file or URL is required' }, { status: 400 });
    }


    const categoryData = {
      title,
      description,
      priority,
      active,
      imageUrl,
    };


    let result;


    if (_id) {
      console.log('Updating category with ID:', _id);
      result = await updateCategory(_id, categoryData);
    } else {
      console.log('Creating new category...');
      result = await createCategory(categoryData);
    }


    return NextResponse.json({ message: 'Category processed successfully', data: result, success: true });


  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


