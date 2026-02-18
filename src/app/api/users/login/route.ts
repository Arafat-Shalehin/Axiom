import { loginController } from "@/controllers/user.controller";

export async function POST(req: Request) {
  return loginController(req as any);
}
