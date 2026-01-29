import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Sub from "@/models/Sub";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const subId = searchParams.get("subId");

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await connectMongo();

    if (subId) {
      const sub = await Sub.findOne({
        _id: subId,
        userId: session.user.id,
      });

      if (!subId) {
        return NextResponse.json(
          { error: "Subscription not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(sub);
    }

    const subs = await Sub.find({ userId: session.user.id });
    return NextResponse.json(subs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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
      nextCharge: body.nextCharge,
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
    const { subId, icon, name, price, unit, categories, note, nextCharge } =
      body;

    if (!subId) {
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
      { _id: subId, userId: session.user.id },
      {
        $set: {
          icon,
          name,
          price: Number(price),
          unit,
          categories,
          note,
          nextCharge,
        },
      },
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
