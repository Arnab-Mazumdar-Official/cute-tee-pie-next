import { Types } from "mongoose";
import dbConnect from "../db/dbConnect";
import add_to_cart from "../models/cart";
import moment from "moment";


// export async function addToCart(body: any) {
//     await dbConnect();
 
//     const category = await add_to_cart.create({
//       ...body,
//     });
 
//     return { message: 'Category created', category };
//   }

export async function addToCart(body: any) {
  await dbConnect();

  const filter = {
    product_id: body.product_id,
    user_id: body.user_id,
    color: body.color,
    size: body.size,
  };

  const update = {
    $set: {
      description: body.description,
      title: body.title,
      price: body.price,
      quantity: body.quantity,
      save_for_letter:body.save_for_letter,
      thumbnail_url:body.thumbnail_url

    },
    // $inc: {
    //    || 1,
    // },
  };

  const options = {
    new: true,     
    upsert: true,  
  };

  const category = await add_to_cart.findOneAndUpdate(filter, update, options);

  return { message: 'Cart updated', category };
}



  export async function cartList(user_id:String) {
      await dbConnect();
   
      const cartData = await add_to_cart.find({user_id});
   
      return { message: 'Category created', cartData };
    }


export async function saveItLetter(_id: string) {
  await dbConnect();

  // First, find the cart item by its _id
  const cartItem = await add_to_cart.findById(_id);

  if (!cartItem) {
    return { message: 'Cart item not found' };
  }

  // Toggle the save_for_letter field
  const updatedCartItem = await add_to_cart.findByIdAndUpdate(
    _id,
    { save_for_letter: !cartItem.save_for_letter },
    { new: true }
  );

  return { message: 'save_for_letter status toggled', cartData: updatedCartItem };
}

