import { Types } from "mongoose";
import dbConnect from "../db/dbConnect";
import address_collcetion from "../models/address";
import moment from "moment";
import { sendPaymentInitiationNotification } from "./user";


export async function saveaddress_collcetion(body: any) {
    await dbConnect();
    console.log("address_collcetion Body---------->>", body);
  
    const { shipping_data, billinging_data, user_id, selected } = body;
    const fullname = `${shipping_data.first_name} ${shipping_data.last_name}`
    
    await sendPaymentInitiationNotification(fullname,shipping_data.email,shipping_data.phone_number);
  
    const shippingPincode = shipping_data?.["pincode"];
    const billingPincode = billinging_data?.["pincode"];
  
    // Check if an address with matching pincodes and user_id exists
    const existingAddress = await address_collcetion.findOne({
      user_id,
      "shipping_data.pincode": shippingPincode,
      "billinging_data.pincode": billingPincode,
    });

  
    let result;

    
    
  
    if (existingAddress) {
      // Update the matched document
      result = await address_collcetion.findOneAndUpdate(
        { _id: existingAddress._id },
        {
          shipping_data,
          billinging_data,
          selected: true, // force selected to true for the updated one
        },
        { new: true }
      );
    } else {
      // Create a new document
      result = await address_collcetion.create({
        shipping_data,
        billinging_data,
        user_id,
        selected: true, // always true for the new one
      });
    }
  
    // Unselect all other addresses for this user
    await address_collcetion.updateMany(
      {
        user_id,
        _id: { $ne: result._id },
      },
      { $set: { selected: false } }
    );
  
    return {
      message: existingAddress ? "Address updated" : "Address created",
      address: result,
    };
  }
  


export async function address_collcetionList(user_id:String) {
    await dbConnect();
 
    const address = await address_collcetion.find({user_id});
 
    return { message: 'address found', address };
  }




export async function updateCategory(_id: string, body: any) {
  await dbConnect();


  if (!Types.ObjectId.isValid(_id)) {
    throw new Error('Invalid category ID');
  }


  const updatedCategory = await address_collcetion.findByIdAndUpdate(
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