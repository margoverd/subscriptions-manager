import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Sub from "@/models/Sub";
import Category from "@/models/Category";

export async function DELETE() {
  try {
    const session = await auth();

    // 1. Проверяем авторизацию
    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await connectMongo();
    const userId = session.user.id;

    // 2. Удаляем все связанные данные пользователя
    // Удаляем все подписки этого пользователя
    await Sub.deleteMany({ userId });

    // Удаляем все категории этого пользователя
    await Category.deleteMany({ userId });

    // 3. Удаляем самого пользователя
    await User.findByIdAndDelete(userId);

    // Возвращаем успех
    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
