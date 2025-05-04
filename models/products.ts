import mongoose, { model, models } from "mongoose";
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
      index: -1,
    },
    active: {
      type: Boolean,
    },

    type: {
      type: String,
    },

    price: {
      type: Number,
    },

    sizes: {
      type: [String],
    },

    colors: {
      type: [String],
    },

    thumbnail_url: {
      type: String,
    },

    image_urls: {
      type: [String]
    },

    created_on: {
      type: Number,
      default: () => moment().valueOf(),
    },
    updated_on: {
      type: Number,
      default: () => moment().valueOf(),
    },

    collectionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const products = models.products || model("products", productsSchema);
export default products;
