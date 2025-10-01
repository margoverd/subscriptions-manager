import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
// clientPromise = способ «подождать подключения к базе», прежде чем с ней работать.
import clientPromise from "./libs/mongo";
import { adapter } from "next/dist/server/web/adapter";

// Создаёшь config, где будут настройки (например, список провайдеров авторизации: Google, GitHub, Credentials).
const config = {
  providers: [
    Resend({
      apiKey: process.env.RESEND_KEY,
      from: "noreply@resend.substop.cc",
      name: "Email",
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // 👉 Адаптер — это «мост» между NextAuth и базой данных (например, MongoDB, PostgreSQL, Prisma).
  // Он говорит: «Эй, NextAuth, вот где хранить пользователей, сессии и токены».
  // Без адаптера — твои пользователи «временные».
  // С адаптером — у тебя реальная база → можно заходить завтра и всё будет на месте.
  adapter: MongoDBAdapter(clientPromise),
};

// Вызов NextAuth(config) возвращает полезные штуки:

// handlers → обработчики API (они обрабатывают вход/выход запросов)

// signIn → функция для входа

// signOut → функция для выхода

// auth → функция для получения текущей сессии

export const { handlers, signIn, signOut, auth } = NextAuth(config);
