import mongoose, { Schema, Model, HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";

/**
 * IUser interface defines the structure of a User document in the database.
 * Contains essential user information and authentication details.
 */
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isActive: boolean;
}

/**
 * IUserMethods interface defines custom instance methods available on User documents.
 * These methods provide additional functionality beyond standard Mongoose operations.
 */
export interface IUserMethods {
  /**
   * Compares a plain text password with the hashed password stored in the database.
   * Uses bcryptjs library for secure comparison.
   * @param password - Plain text password to compare
   * @returns Promise that resolves to true if password matches, false otherwise
   */
  comparePassword(password: string): Promise<boolean>;
}

export type UserDocument = HydratedDocument<IUser, IUserMethods>;

const userSchema = new Schema<
  IUser,
  Model<IUser, {}, IUserMethods>,
  IUserMethods
>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

/**
 * Instance method: comparePassword
 * Uses bcryptjs to securely compare a plain text password with the hashed password stored in database.
 * This is called during login to verify user credentials.
 * @param password - The plain text password provided by the user
 * @returns Promise<boolean> - true if password matches, false otherwise
 */
userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

/**
 * User model export.
 * Checks if model already exists (for hot module reloading in development) or creates a new one.
 * This prevents model recompilation errors during development.
 * Exported model includes all custom methods defined in IUserMethods.
 */
export const User =
  (mongoose.models.User as Model<IUser, {}, IUserMethods>) ||
  mongoose.model<IUser, Model<IUser, {}, IUserMethods>>("User", userSchema);
