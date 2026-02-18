import { NextRequest, NextResponse } from "next/server";
import { createUser, loginUser, getUserById } from "@/services/user.service";
// import { connectDB } from "@/config/db";

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
