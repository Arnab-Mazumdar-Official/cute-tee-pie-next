import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../db/dbConnect';
import customise_orders from '../../../../models/customise_orders';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: 'Missing userId in query params',
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const orders = await customise_orders.aggregate([
        {
            '$match':{
                user_id: userId
            }
        },
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
          }, 'Customised Orders'
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
])
    return NextResponse.json({
      success: true,
      status: 200,
      data: {
        message: 'orders found',
        orders,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: 'Something went wrong',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
