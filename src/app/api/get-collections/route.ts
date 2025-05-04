import { NextResponse } from "next/server";
import dbConnect from '../../../../db/dbConnect';
import collections from '../../../../models/collection';

export const GET = async () => {
    try {
      await dbConnect();
  
      // Use .select() if using Mongoose
      const collectionlist = await collections.find({}, '_id title');
  
      console.log('collectionlist--------->>', collectionlist);
  
      const collectionNames = collectionlist.map((col) => ({
        label: col.title,
        value: col._id.toString(),
      }));
  
      console.log('collectionNames--------->>', collectionNames);
  
      return NextResponse.json({
        success: true,
        status: 200,
        collections: collectionNames,
      });
    } catch (err) {
      console.error('Error fetching collections:', err);
      return NextResponse.json({
        success: false,
        status: 500,
        message: 'Internal server error',
      });
    }
  };
