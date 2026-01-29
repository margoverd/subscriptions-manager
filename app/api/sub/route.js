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
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("subId");

    if (!id) {
      return NextResponse.json(
        { error: "Subscription ID is required" },
        { status: 400 },
      );
    }

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await connectMongo();

    const result = await Sub.deleteOne({
      _id: id,
      userId: session.user.id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 },
      );
    }

    await User.findByIdAndUpdate(session.user.id, {
      $pull: { subs: id },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, note } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Subscription ID is required" },
        { status: 400 },
      );
    }

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await connectMongo();

    const updatedSub = await Sub.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { $set: { note: note } },
      { new: true },
    );

    if (!updatedSub) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedSub);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
