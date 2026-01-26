import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import Project from "@/models/Project";

// GET: Получить все проекты текущего юзера
export async function GET() {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    await connectMongo();
    const projects = await Project.find({ userId: session.user.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Создать новый проект
export async function POST(req) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    const { name } = await req.json();
    if (!name)
      return NextResponse.json({ error: "Name is required" }, { status: 400 });

    await connectMongo();
    const newProject = await Project.create({
      userId: session.user.id,
      name,
    });

    return NextResponse.json(newProject);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: Редактировать название проекта
export async function PATCH(req) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    const { id, name } = await req.json();
    await connectMongo();

    const updatedProject = await Project.findOneAndUpdate(
      { _id: id, userId: session.user.id }, // проверка владения
      { name },
      { new: true },
    );

    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Удалить проект
export async function DELETE(req) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    const { id } = await req.json();
    await connectMongo();

    await Project.findOneAndDelete({ _id: id, userId: session.user.id });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
