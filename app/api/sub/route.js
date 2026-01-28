import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Sub from "@/models/Sub";
import { revalidatePath } from "next/cache";

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

    if (!user) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 },
      );
    }

    const sub = await Sub.create({
      userId: user._id,
      icon: body.icon,
      name: body.name,
      price: body.price,
      unit: body.unit,
      categories: body.categories,
      note: body.note,
    });

    user.subs.push(sub._id);
    await user.save();

    return NextResponse.json({ sub });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    await connectMongo();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Sub.deleteOne({ _id: id, userId: session.user.id });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
