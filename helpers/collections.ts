import { Types } from "mongoose";
import dbConnect from "../db/dbConnect";
import collections from "../models/collection";
import moment from "moment";




export async function createCategory(body: any) {
    await dbConnect();
 
    const category = await collections.create({
      ...body,
      // active: body.active === 'true',
      priority: Number(body.priority),
    });
 
    return { message: 'Category created', category };
  }
export async function collectionList() {
    await dbConnect();
 
    const category = await collections.aggregate([
        {
          $project: {
            title: 1,
            active: 1,
            image: "$imageUrl",
            createdOn: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: { $toDate: "$created_on" }
              }
            }
          }
        }
      ]);
 
    return { message: 'Category created', category };
  }




export async function updateCategory(_id: string, body: any) {
  await dbConnect();


  if (!Types.ObjectId.isValid(_id)) {
    throw new Error('Invalid category ID');
  }


  const updatedCategory = await collections.findByIdAndUpdate(
    _id,
    {
      ...body,
      priority: Number(body.priority),
      updated_on:moment().valueOf()
    },
    { new: true } // returns the updated document
  );


  if (!updatedCategory) {
    throw new Error('Category not found');
  }


  return { message: 'Category updated', category: updatedCategory };
}


