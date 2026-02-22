import { registerController } from "@/controllers/user.controller";

/**
 * POST /api/users/register
 * Handles user registration requests.
 * Validates input and creates a new user account in the database.
 * 
 * @param req - Next.js Request object containing registration data
 * @returns Response with created user (201) or error message (400)
 */
export async function POST(req: Request) {
  return registerController(req as any);
}
