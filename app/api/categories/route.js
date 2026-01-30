import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import Category from "@/models/Category";

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
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
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

    // 1. Находим старое имя
    const oldCategory = await Category.findOne({
      _id: id,
      userId: session.user.id,
    });
    if (!oldCategory)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const oldName = oldCategory.name;

    // 2. Обновляем категорию
    oldCategory.name = newName;
    await oldCategory.save();

    // 3. Обновляем имя во всех подписках, где оно встречалось
    // Используем позиционный оператор $[], чтобы обновить все элементы массива, совпавшие с условием
    await Sub.updateMany(
      { userId: session.user.id, categories: oldName },
      { $set: { "categories.$[elem]": newName } },
      { arrayFilters: [{ elem: oldName }] },
    );

    return NextResponse.json(oldCategory);
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

    const { id } = await req.json();
    await connectMongo();

    // 1. Ищем категорию, чтобы узнать ее имя перед удалением
    const categoryToDelete = await Category.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!categoryToDelete)
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );

    const categoryName = categoryToDelete.name;

    // 2. Удаляем саму категорию
    await Category.deleteOne({ _id: id });

    // 3. Удаляем упоминание этой категории из всех подписок юзера
    await Sub.updateMany(
      { userId: session.user.id, categories: categoryName },
      { $pull: { categories: categoryName } },
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
