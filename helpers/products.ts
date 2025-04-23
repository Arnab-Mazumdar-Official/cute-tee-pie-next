import mongoose from "mongoose";
import dbConnect from "../db/dbConnect";
import products from "../models/products";


export async function createProducts(data: any): Promise<any> {
    try {
      await dbConnect();
      return await products.create(data);
    } catch (error: any) {
      console.log("error++",error);
      
      throw  error.message
    }
  }