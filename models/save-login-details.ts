import mongoose, { model, models } from "mongoose";
import moment from "moment";

const loginDetailsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    ipInfo: {
        type: Object,
        required: true
    },
    login_status: {
      type: Boolean, 
      required: true,
    },
    cause: {
      type: String, 
      required: true,
    },
    created_on: {
      type: Number,
      default: moment().valueOf(),
    },
  },
  {
    timestamps: true,
  }
);

const loginDetails =
  models.save_login_details || model("save_login_details", loginDetailsSchema);

export default loginDetails;
