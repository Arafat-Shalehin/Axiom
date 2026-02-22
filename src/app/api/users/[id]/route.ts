import { getUserController } from "@/controllers/user.controller";

/**
 * GET /api/users/[id]
 * Retrieves user information by ID from the database.
 * Returns public user data (excludes sensitive information like password hash).
 * 
 * @param _req - Next.js Request object (unused)
 * @param params - Object containing route parameters
 * @param params.id - MongoDB ObjectId of the user to retrieve
 * @returns Response with user data (200) or error message (404 if not found)
 */
export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  return getUserController(params.id);
}
