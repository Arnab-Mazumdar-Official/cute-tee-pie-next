import mongoose, { Types } from "mongoose";
import dbConnect from "../db/dbConnect";
import products from "../models/products";
import Orders from "../models/orders";
import refferel_earning from "../models/refferel_earning";
import customise_orders from "../models/customise_orders";
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


export async function orderList() {

  console.log("product List Debug 1");
  
  await dbConnect();
  console.log("product List Debug 1");
  const orders = await Orders.aggregate([
    {
      '$sort':{'_id':-1}
    },
  {
    '$addFields': {
      'product_id_obj': {
        '$toObjectId': '$product_id'
      }, 
      'user_id_obj': {
        '$toObjectId': '$user_id'
      }
    }
  }, {
    '$lookup': {
      'from': 'products', 
      'localField': 'product_id_obj', 
      'foreignField': '_id', 
      'as': 'product_details'
    }
  }, {
    '$lookup': {
      'from': 'users', 
      'localField': 'user_id_obj', 
      'foreignField': '_id', 
      'as': 'users_details'
    }
  }, {
    '$lookup': {
      'from': 'address_collcetions', 
      'let': {
        'userId': '$user_id'
      }, 
      'pipeline': [
        {
          '$match': {
            '$expr': {
              '$and': [
                {
                  '$eq': [
                    '$user_id', '$$userId'
                  ]
                }, {
                  '$eq': [
                    '$selected', true
                  ]
                }
              ]
            }
          }
        }
      ], 
      'as': 'address_details'
    }
  }, {
    '$addFields': {
      'product_name': {
        '$ifNull': [
          {
            '$arrayElemAt': [
              '$product_details.title', 0
            ]
          }, 'Not Found'
        ]
      }, 
      'user_name': {
        '$ifNull': [
          {
            '$arrayElemAt': [
              '$users_details.name', 0
            ]
          }, 'Not Found'
        ]
      }
    }
  }
]);
  console.log("product List Debug 1");

  return { message: 'orders found', orders };
}


export async function referelEarningList() {

  console.log("product List Debug 1");
  
  await dbConnect();
  console.log("product List Debug 1");
  const orders = await refferel_earning.aggregate([
    {
      '$sort':{'_id':-1}
    },
 {
    '$addFields': {
      'isCustomProduct': {
        '$eq': [
          '$product_id', 'Customised Procduct'
        ]
      }
    }
  }, {
    '$addFields': {
      'product_id_obj': {
        '$cond': {
          'if': {
            '$eq': [
              '$isCustomProduct', false
            ]
          }, 
          'then': {
            '$toObjectId': '$product_id'
          }, 
          'else': null
        }
      }, 
      'user_id_obj': {
        '$toObjectId': '$user_id'
      }, 
      'reffered_user_id_obj': {
        '$toObjectId': '$reffered_user_id'
      }
    }
  }, {
    '$lookup': {
      'from': 'products', 
      'localField': 'product_id_obj', 
      'foreignField': '_id', 
      'as': 'product_details'
    }
  }, {
    '$lookup': {
      'from': 'users', 
      'localField': 'reffered_user_id_obj', 
      'foreignField': '_id', 
      'as': 'referred_users_details'
    }
  }, {
    '$lookup': {
      'from': 'users', 
      'localField': 'user_id_obj', 
      'foreignField': '_id', 
      'as': 'users_details'
    }
  }, {
    '$lookup': {
      'from': 'address_collcetions', 
      'let': {
        'userId': '$user_id'
      }, 
      'pipeline': [
        {
          '$match': {
            '$expr': {
              '$and': [
                {
                  '$eq': [
                    '$user_id', '$$userId'
                  ]
                }, {
                  '$eq': [
                    '$selected', true
                  ]
                }
              ]
            }
          }
        }
      ], 
      'as': 'address_details'
    }
  }, {
    '$addFields': {
      'product_name': {
        '$cond': {
          'if': '$isCustomProduct', 
          'then': 'Customised Procduct', 
          'else': {
            '$ifNull': [
              {
                '$arrayElemAt': [
                  '$product_details.title', 0
                ]
              }, 'Not Found'
            ]
          }
        }
      }, 
      'user_name': {
        '$ifNull': [
          {
            '$arrayElemAt': [
              '$users_details.name', 0
            ]
          }, 'Not Found'
        ]
      }, 
      'reffered_user_name': {
        '$ifNull': [
          {
            '$arrayElemAt': [
              '$referred_users_details.name', 0
            ]
          }, 'Not Found'
        ]
      }
    }
  }
]);
  console.log("product List Debug 1");

  return { message: 'orders found', orders };
}

export async function customiseOrderList() {

  console.log("product List Debug 1");
  
  await dbConnect();
  console.log("product List Debug 1");
  const orders = await customise_orders.aggregate([
    {
      '$sort':{'_id':-1}
    },
  {
    '$addFields': {
      'product_id_obj': {
        '$toObjectId': '$product_id'
      }, 
      'user_id_obj': {
        '$toObjectId': '$user_id'
      }
    }
  }, {
    '$lookup': {
      'from': 'products', 
      'localField': 'product_id_obj', 
      'foreignField': '_id', 
      'as': 'product_details'
    }
  }, {
    '$lookup': {
      'from': 'users', 
      'localField': 'user_id_obj', 
      'foreignField': '_id', 
      'as': 'users_details'
    }
  }, {
    '$lookup': {
      'from': 'address_collcetions', 
      'let': {
        'userId': '$user_id'
      }, 
      'pipeline': [
        {
          '$match': {
            '$expr': {
              '$and': [
                {
                  '$eq': [
                    '$user_id', '$$userId'
                  ]
                }, {
                  '$eq': [
                    '$selected', true
                  ]
                }
              ]
            }
          }
        }
      ], 
      'as': 'address_details'
    }
  }, {
    '$addFields': {
      'product_name': {
        '$ifNull': [
          {
            '$arrayElemAt': [
              '$product_details.title', 0
            ]
          }, 'Customised products'
        ]
      }, 
      'user_name': {
        '$ifNull': [
          {
            '$arrayElemAt': [
              '$users_details.name', 0
            ]
          }, 'Not Found'
        ]
      }
    }
  }
]);
  console.log("product List Debug 1");

  return { message: 'orders found', orders };
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
export async function getProductByid(product_id: string) {
  await dbConnect();
  const productDetails = await products.findById(product_id);
  console.log("Product Details--------->>",productDetails);
  

  if(productDetails){
    return productDetails;
  }
  else{
    return "Not Found";
  }
}

export async function usercollectionList({ skip = 0, limit = 6 }) {
  console.log("product List Debug 1");

  await dbConnect();
  console.log("product List Debug 2");

  // const skip = page * limit;

  const [category, total] = await Promise.all([
    products.aggregate([
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
      },
      {
        '$project': {
          'title': 1,
          'active': 1,
          'image': '$thumbnail_url',
          'slug': '$slug',
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
      },
      { $skip: skip },
      { $limit: limit }
    ]),
    products.countDocuments()
  ]);

  console.log("product List Debug 3");

  return { category, total };
}




  