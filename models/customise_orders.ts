import mongoose, { Schema, model, models } from "mongoose";
import moment from "moment";

const customise_ordersSchema = new Schema(
  {
    razorpay_order_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    product: {
      type: [Object],
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed"],
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    created_on: {
      type: Number,
      default: () => moment().valueOf(),
    },
    updated_on: {
      type: Number,
      default: () => moment().valueOf(),
      index: -1,
    },
    desposition: {
      type: String,
      index: -1,
    },
    delivery_date: {
      type: String,
      index: -1,
    },
  },
  {
    timestamps: true,
  }
);

const customise_orders = models.customise_orders || model("customise_orders", customise_ordersSchema);
export default customise_orders;
