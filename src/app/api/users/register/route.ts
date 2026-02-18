import { registerController } from "@/controllers/user.controller";

export async function POST(req: Request) {
  return registerController(req as any);
}
