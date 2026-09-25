import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import Category from "@/models/Category";
import Sub from "@/models/Sub";

// GET: Получить все категории текущего юзера
export async function GET() {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    await connectMongo();
    const categories = await Category.find({ userId: session.user.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

// POST: Создать новую категорию
export async function POST(req) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    const { name } = await req.json();
    if (!name)
      return NextResponse.json({ error: "Name is required" }, { status: 400 });

    await connectMongo();
    const newCategory = await Category.create({
      userId: session.user.id,
      name,
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: Редактировать название категории
export async function PATCH(req) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    const { id, name: newName } = await req.json();

    await connectMongo();

    // Просто обновляем имя в коллекции категорий.
    // В подписках (Sub) лежат ID, которые НЕ МЕНЯЮТСЯ при переименовании,
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { name: newName },
      { new: true },
    );

    if (!updatedCategory)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Удалить категорию
export async function DELETE(req) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await connectMongo();

    // 1. Удаляем саму категорию
    const result = await Category.deleteOne({
      _id: id,
      userId: session.user.id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }

    // 2. Удаляем этот ID из всех массивов categories в подписках
    await Sub.updateMany(
      { userId: session.user.id, categories: id },
      { $pull: { categories: id } },
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
