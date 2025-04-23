import mongoose, { CallbackError, model, models } from "mongoose";
import moment from "moment";

const productsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: -1,
    },

    description: {
      type: String,
    },
    priority: {
      type: Number,
      // required: true,

      index: -1,
    },
    status: {
      type: Number
    },
    
    images: {
      type: Array<object>,
    },

    created_on: {
      type: Number,
      default: moment().valueOf(),
    },
    updated_on: {
      type: Number,
      default: moment().valueOf(),
    },
    category_id: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const products =
  models.products || model("products", productsSchema);

export default products;
