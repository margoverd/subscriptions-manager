import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Sub from "@/models/Sub";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Subscription name is required" },
        { status: 400 },
      );
    }

    if (!body.price) {
      return NextResponse.json(
        { error: "Subscription price is required" },
        { status: 400 },
      );
    }

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await connectMongo();

    const user = await User.findById(session.user.id);

    const sub = await Sub.create({
      userId: user._id,
      icon: body.icon,
      name: body.name,
      price: body.price,
      unit: body.unit,
      projects: body.projects,
      note: body.note,
    });

    user.sub.push(sub._id);
    await user.save();

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
