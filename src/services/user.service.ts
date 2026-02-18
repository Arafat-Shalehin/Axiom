import { User, UserDocument } from "@/models/User.models";

// TS Stuff
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}

// TS Stuff
export interface LoginUserDTO {
  email: string;
  password: string;
}

export async function createUser(data: CreateUserDTO) {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new Error("User already exists.");
  }

  const user = await User.create(data);

  return user;
}

export async function loginUser(data: LoginUserDTO): Promise<UserDocument> {
  const user = await User.findOne({ email: data.email })
    .select("+password")
    .exec();

  if (!user) {
    throw new Error("Invalid credentials.");
  }

  const isMatch = await user.comparePassword(data.password);

  if (!isMatch) {
    throw new Error("Invalid credentials.");
  }

  return user;
}

export async function getUserById(id: string) {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}
