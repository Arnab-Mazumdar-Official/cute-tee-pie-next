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
    slug: {
      type: String,
      required: true, unique: true,
      index: -1,
    },
    priority: {
      type: Number,
      index: -1,
    },
    active: {
      type: Boolean,
      index: -1,
    },

    type: {
      type: String,
      index: -1,
    },

    price: {
      type: Number,
      index: -1,
    },

    sizes: {
      type: [String],
      index: -1,
    },

    colors: {
      type: [String],
      index: -1,
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
      index: -1,
    },

    
  },
  {
    timestamps: true,
  }
);

const products = models.products || model("products", productsSchema);
export default products;
