import mongoose, { Types } from "mongoose";
import dbConnect from "../db/dbConnect";
import products from "../models/products";
import moment from "moment";


export async function createCategory(body: any) {
  await dbConnect();

  const now = moment().valueOf();

  const category = await products.create({
    title: body.title,
    description: body.description,
    priority: Number(body.priority),
    active: body.active,
    type: body.type,
    price: Number(body.price),
    sizes: Array.isArray(body.sizes) ? body.sizes : [],
    colors: Array.isArray(body.colors) ? body.colors : [],
    thumbnail_url: body.thumbnail_url,
    image_urls: Array.isArray(body.image_urls) ? body.image_urls : [],
    collectionId: body.collectionId || '', 
  });

  return { message: 'Category created', category };
}
export async function collectionList() {

  console.log("product List Debug 1");
  
  await dbConnect();
  console.log("product List Debug 1");
  const category = await products.aggregate([
    {
      '$lookup': {
        'from': 'collections', 
        'let': {
          'collectionIdObject': {
            '$cond': {
              'if': {
                '$and': [
                  {
                    '$gt': [
                      {
                        '$strLenBytes': '$collectionId'
                      }, 0
                    ]
                  }, {
                    '$regexMatch': {
                      'input': '$collectionId', 
                      'regex': new RegExp('^[a-fA-F0-9]{24}$')
                    }
                  }
                ]
              }, 
              'then': {
                '$toObjectId': '$collectionId'
              }, 
              'else': null
            }
          }
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$_id', '$$collectionIdObject'
                ]
              }
            }
          }
        ], 
        'as': 'collection_data'
      }
    }, {
      '$project': {
        'title': 1, 
        'active': 1, 
        'image': '$thumbnail_url', 
        'createdOn': {
          '$dateToString': {
            'format': '%Y-%m-%d', 
            'date': {
              '$toDate': '$created_on'
            }
          }
        }, 
        'category': {
          '$ifNull': [
            {
              '$arrayElemAt': [
                '$collection_data.title', 0
              ]
            }, 'Not Found'
          ]
        }
      }
    }
  ]);
  console.log("product List Debug 1");

  return { message: 'Category created', category };
}




export async function updateCategory(_id: string, body: any) {
  await dbConnect();

  if (!Types.ObjectId.isValid(_id)) {
    throw new Error('Invalid category ID');
  }

  const updateFields = {
    ...body,
    title: body.title?.trim() || '',
    description: body.description?.trim() || '',
    priority: Number(body.priority) || 0,
    active: Boolean(body.active),
    type: body.type || '',
    price: Number(body.price) || 0,
    sizes: Array.isArray(body.sizes) ? body.sizes : [],
    colors: Array.isArray(body.colors) ? body.colors : [],
    thumbnail_url: body.thumbnail_url || '',
    image_urls: Array.isArray(body.image_urls) ? body.image_urls : [],
    collectionId: body.collectionId || '',
    updated_on: moment().valueOf(),
  };

  const updatedCategory = await products.findByIdAndUpdate(_id, updateFields, { new: true });

  if (!updatedCategory) {
    throw new Error('Category not found');
  }

  return { message: 'Category updated', category: updatedCategory };
}



  