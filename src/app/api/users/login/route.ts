import { loginController } from "@/controllers/user.controller";

/**
 * POST /api/users/login
 * Handles user login requests.
 * Authenticates user credentials and returns authenticated user data with token.
 * 
 * @param req - Next.js Request object containing login credentials (email, password)
 * @returns Response with authenticated user (200) or error message (401)
 */
export async function POST(req: Request) {
  return loginController(req as any);
}
