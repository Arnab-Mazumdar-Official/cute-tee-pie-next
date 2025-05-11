import mongoose, { model, models } from "mongoose";
import moment from "moment";


const add_to_cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      index: -1,
    },
    product_id: {
      type: String,
      index: -1,
    },
    title: {
      type: String,
      index: -1,
    },
    description: {
      type: String,
      index: -1,
    },
    size: {
      type: String,
      index: -1,
    },
    color: {
      type: String,
      index: -1,
    },
    thumbnail_url: {
      type: String,
      index: -1,
    },
    price: {
      type: Number,
      index: -1,
    },
    quantity: {
      type: Number,
      index: -1,
    },
    save_for_letter: {
      type: Boolean,
      index: -1,
    },
    created_on: {
      type: Number,
      default: moment().valueOf(),
    },
    updated_on: {
      type: Number,
      index: -1,
      default: moment().valueOf(),
    }
  },


  {
    timestamps: true,
  }
);


const add_to_cart =
  models.add_to_cart || model("add_to_cart", add_to_cartSchema);


export default add_to_cart;
