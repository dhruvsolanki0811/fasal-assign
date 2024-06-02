import connectDb from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";
import User from "@/models/User";

connectDb();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
