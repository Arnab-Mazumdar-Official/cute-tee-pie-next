import mongoose, { model, models } from "mongoose";
import moment from "moment";


const collectionsSchema = new mongoose.Schema(
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
      index: -1,
    },
   
    imageUrl: {
      type: String,
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


const collections =
  models.collections || model("collections", collectionsSchema);


export default collections;
