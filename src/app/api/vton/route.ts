import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@gradio/client';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { humanImageBase64, garm_img_url } = await req.json();

    console.log('humanImageBase64:', humanImageBase64);
    console.log('garm_img_url :', garm_img_url);
    const { data: arrayBuffer } = await axios.get(garm_img_url, {
      responseType: 'arraybuffer',
    });
    const base64Cloth = Buffer.from(arrayBuffer).toString('base64');

    const garm_img_path = {
      path: null,
      url: `data:image/jpeg;base64,${base64Cloth}`,
      size: null,
      orig_name: 'garment.jpg',
      mime_type: 'image/jpeg',
      is_stream: false,
      meta: {},
    };

    const client = await Client.connect('phitran/fashion-virtual-tryon');

    const humanInput = {
      path: null,
      url: humanImageBase64,
      size: null,
      orig_name: 'human.png',
      mime_type: 'image/png',
      is_stream: false,
      meta: {},
    };

    // const clothInput = {
    //   path: null,
    //   url: clothImageBase64,
    //   size: null,
    //   orig_name: "cloth.png",
    //   mime_type: "image/png",
    //   is_stream: false,
    //   meta: {},
    // };
    console.log('humanInput:', humanInput);
    console.log('clothInput:', humanInput);
    const result = await client.predict('/process_image', {
      human_img_path: humanInput,
      garm_img_path: garm_img_path,
    });

    console.log('Result from Gradio:', result);
    const output = result.data as {
      path: string;
      url: string;
    }[];

    const outputUrl = output?.[0]?.url;

    if (!outputUrl) {
      throw new Error('Gradio did not return a valid image URL');
    }

    return NextResponse.json({ url: outputUrl });
  } catch (err) {
    console.error('VTON API Error:', err);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}
