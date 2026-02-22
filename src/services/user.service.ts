import { User, UserDocument } from "@/models/User.models";

/**
 * CreateUserDTO: Data Transfer Object for user registration.
 * Defines the structure and expected types for user registration input.
 */
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}

/**
 * LoginUserDTO: Data Transfer Object for user login.
 * Defines the structure and expected types for user login input.
 */
export interface LoginUserDTO {
  email: string;
  password: string;
}

/**
 * createUser: Creates a new user in the database.
 * Validates that the email doesn't already exist before creating the user.
 * 
 * Process:
 * 1. Checks if user with the same email already exists
 * 2. Throws error if email is already registered
 * 3. Creates and returns new user document if validation passes
 * 
 * Note: Password should be hashed at this point (implement pre-save middleware in schema).
 * 
 * @param data - CreateUserDTO containing name, email, password, and optional role
 * @returns Promise<UserDocument> - The newly created user object
 * @throws Error if user with email already exists
 */
export async function createUser(data: CreateUserDTO) {
  // Check if user with this email already exists
  const existingUser = await User.findOne({ email: data.email });

  // Prevent duplicate email registration
  if (existingUser) {
    throw new Error("User already exists.");
  }

  const user = await User.create(data);

  return user;
}

/**
 * loginUser: Authenticates a user with email and password.
 * Verifies credentials and returns the authenticated user document.
 * 
 * Process:
 * 1. Finds user by email from request
 * 2. Selects password field (normally excluded from queries)
 * 3. Compares provided password with hashed password using comparePassword method
 * 4. Returns user if credentials match
 * 5. Throws error for invalid email or password
 * 
 * @param data - LoginUserDTO containing email and password
 * @returns Promise<UserDocument> - The authenticated user object (without password)
 * @throws Error if user not found or password doesn't match
 */
export async function loginUser(data: LoginUserDTO): Promise<UserDocument> {
  // Find user by email and explicitly include password field (normally excluded by schema)
  const user = await User.findOne({ email: data.email })
    .select("+password")
    .exec();

  // Verify user exists
  if (!user) {
    throw new Error("Invalid credentials.");
  }

  // Compare provided password with hashed password using bcryptjs
  const isMatch = await user.comparePassword(data.password);

  // Throw error if password doesn't match
  if (!isMatch) {
    throw new Error("Invalid credentials.");
  }

  // Return authenticated user
  return user;
}

/**
 * getUserById: Retrieves a user by their MongoDB ID.
 * Fetches user information from the database.
 * 
 * Process:
 * 1. Queries database for user with matching ID
 * 2. Returns user if found
 * 3. Throws error if user not found
 * 
 * @param id - MongoDB ObjectId of the user to retrieve
 * @returns Promise<any> - The user object
 * @throws Error if user with given ID not found
 */
export async function getUserById(id: string) {
  // Query for user by MongoDB ID
  const user = await User.findById(id);

  // Verify user exists
  if (!user) {
    throw new Error("User not found.");
  }

  // Return the user object
  return user;
}
