import mongoose, { model, models } from "mongoose";
import moment from "moment";


const address_collcetionSchema = new mongoose.Schema(
  {
    shipping_data: {
      type: Object,
      required: true,
      index: -1,
    },


    billinging_data: {
      type: Object,
      required: true,
      index: -1,
    },
    user_id: {
      type: String,
      index: -1,
    },
    selected: {
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


const address_collcetion =
  models.address_collcetion || model("address_collcetion", address_collcetionSchema);


export default address_collcetion;
