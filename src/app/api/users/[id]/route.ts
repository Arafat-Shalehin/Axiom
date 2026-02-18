import { getUserController } from "@/controllers/user.controller";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  return getUserController(params.id);
}
