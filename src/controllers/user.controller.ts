import { NextRequest, NextResponse } from "next/server";
import { createUser, loginUser, getUserById } from "@/services/user.service";
// import { connectDB } from "@/config/db";

/**
 * registerController: Handles user registration requests.
 * Validates input data, creates a new user in the database, and returns the created user.
 * 
 * Process:
 * 1. Extracts user data from request body
 * 2. Calls service layer to create the user (validates for existing email)
 * 3. Returns newly created user on success
 * 4. Returns error message on failure (e.g., email already exists)
 * 
 * @param req - NextRequest containing user registration data (name, email, password, role)
 * @returns NextResponse with created user data and 201 status on success, or error with 400 status on failure
 */
export async function registerController(req: NextRequest) {
  try {
    // await connectDB();

    const body = await req.json();

    const user = await createUser(body);

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}

/**
 * loginController: Handles user login requests.
 * Authenticates the user by verifying email and password credentials.
 * 
 * Process:
 * 1. Extracts email and password from request body
 * 2. Calls service layer to authenticate user
 * 3. Returns authenticated user data on success
 * 4. Returns error message on failure (invalid credentials)
 * 
 * @param req - NextRequest containing login credentials (email and password)
 * @returns NextResponse with authenticated user data and 200 status on success, or error with 401 status on failure
 */
export async function loginController(req: NextRequest) {
  try {
    // await connectDB();

    const body = await req.json();

    const user = await loginUser(body);

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 },
    );
  }
}

/**
 * getUserController: Handles requests to fetch a user by their ID.
 * Retrieves user information from the database without sensitive data.
 * 
 * Process:
 * 1. Takes user ID as parameter from URL
 * 2. Calls service layer to find user by ID
 * 3. Returns user data on success
 * 4. Returns error message if user not found
 * 
 * @param id - MongoDB ObjectId of the user to retrieve
 * @returns NextResponse with user data and 200 status on success, or error with 404 status if user not found
 */
export async function getUserController(id: string) {
  try {
    // await connectDB();

    const user = await getUserById(id);

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 404 },
    );
  }
}
