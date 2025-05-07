import mongoose, { Types } from "mongoose";
import dbConnect from "../db/dbConnect";
import products from "../models/products";
import moment from "moment";
import slugifyLib from 'slugify';


export async function createCategory(body: any) {
  await dbConnect();

  const productData = {
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
    slug: body.slug || '', 
  }

  console.log("Product Data--------->>",productData);
  

  const Product = await products.create(productData);

  return { message: 'Product created', Product };
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
        'slug':'$slug',
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
    throw new Error('Invalid Product ID');
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
    slug: body.slug || '',
  };

  console.log("updateFields----------->>",updateFields);
  

  const updatedCategory = await products.findByIdAndUpdate(_id, updateFields, { new: true });

  if (!updatedCategory) {
    throw new Error('Category not found');
  }

  return { message: 'Category updated', category: updatedCategory };
}

export function generateSlug(text: string): string {
  return slugifyLib(text, { lower: true, strict: true });
}

export async function getProductByName(productname: string) {
  await dbConnect();
  const slug = generateSlug(productname);
  console.log("Slug----------->>",slug);
  
  const productDetails = await products.findOne({ slug });
  console.log("Product Details--------->>",productDetails);
  

  if(productDetails){
    return productDetails;
  }
  else{
    return "Not Found";
  }
}



  