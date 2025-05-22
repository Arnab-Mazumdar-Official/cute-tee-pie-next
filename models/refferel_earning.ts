import mongoose, { CallbackError, model, models } from "mongoose";
import moment from "moment";

const refferel_earningSchema = new mongoose.Schema(
 {
     razorpay_order_id: {
       type: String,
       required: true,
     },
     product_id: {
       type: String,
       required: true,
     },
     user_id: {
       type: String,
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
     created_at: {
       type: Date,
       default: Date.now,
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
     referel_earning: {
       type: Number,
       index: -1,
     },
     reffered_user_id: {
       type: String,
       index: -1,
     },
     refferel_payment_status: {
       type: String,
       index: -1,
     },
   },
   {
     timestamps: true,
   }
);

const refferel_earning =
  models.refferel_earning || model("refferel_earning", refferel_earningSchema);

export default refferel_earning;
