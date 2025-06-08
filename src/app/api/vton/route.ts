import { NextRequest, NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(req: NextRequest) {
  try {
    const { humanImageBase64, clothImageBase64 } = await req.json();

    const client = await Client.connect("phitran/fashion-virtual-tryon");

    const humanInput = {
      path: null,
      url: humanImageBase64,
      size: null,
      orig_name: "human.png",
      mime_type: "image/png",
      is_stream: false,
      meta: {},
    };

    const clothInput = {
      path: null,
      url: clothImageBase64,
      size: null,
      orig_name: "cloth.png",
      mime_type: "image/png",
      is_stream: false,
      meta: {},
    };
    console.log("humanInput:", humanInput);
    console.log("clothInput:", humanInput);
    const result = await client.predict("/process_image", {
      human_img_path: humanInput,
      garm_img_path: clothInput,
    });

    console.log("Result from Gradio:", result);
    const output = result.data as {
        path: string;
        url: string;
    }[];

    const outputUrl = output?.[0]?.url;


    if (!outputUrl) {
      throw new Error("Gradio did not return a valid image URL");
    }

    return NextResponse.json({ url: outputUrl });
  } catch (err) {
    console.error("VTON API Error:", err);
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
  }
}
