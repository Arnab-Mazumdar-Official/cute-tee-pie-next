import mongoose, { CallbackError, model, models } from "mongoose";
import moment from "moment";

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: -1,
    },
    password: {
      type: String,
      required: true,

      index: -1,
    },
    admin_password: {
      type: String,
      required: true,

      index: -1,
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    role: {
      type: String,
      required: true,
      index: -1,
    },
    
    // address: {
    //   type:String,
    // },

    created_on: {
      type: Number,
      default: moment().valueOf(),
    },
    updated_on: {
      type: Number,
      default: moment().valueOf(),
    },
    // state: {
    //   type: String,
    // },
    // city: {
    //   type: String,
    // },
    // zip: {
    //   type: String,
    // },
  },

  {
    timestamps: true,
  }
);

const users =
  models.users || model("users", usersSchema);

export default users;
