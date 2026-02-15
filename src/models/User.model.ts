import mongoose, { models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

export const User = models.User || mongoose.model("User", UserSchema);
