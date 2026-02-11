import Icon from "@/components/Icon";
import Image from "next/image";
import MenuAvatarPopover from "@/components/MenuAvatarPopover";
import Link from "next/link";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import Sub from "@/models/Sub";
import ButtonDownloadData from "@/components/ButtonDownloadData";
import ButtonDeleteAccount from "@/components/ButtonDeleteAccount";
import ButtonLogout from "@/components/ButtonLogout";

export default async function SettingsPage() {
  const session = await auth();
  await connectMongo();

  const rawSubscriptions = await Sub.find({ userId: session.user.id }).lean();
  const subscriptions = JSON.parse(JSON.stringify(rawSubscriptions));

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-10">
      <header className="max-full mx-auto pb-6 flex justify-between items-center gap-2">
        <Link
          href="/dashboard"
          aria-label="Back to Dashboard"
          className="flex items-center gap-2 group text-base-content/70 hover:text-base-content transition-colors whitespace-nowrap"
        >
          <Icon
            name="angle-left"
            className="text-xl transform transition-transform duration-200 group-hover:-translate-x-1"
          />
          <span className="hidden sm:inline">Back</span>
        </Link>

        <h1 className="text-xl md:text-2xl truncate">
          Account Settings
        </h1>

        <MenuAvatarPopover user={session.user} />
      </header>

      <div className="space-y-6 md:y-8">
        {/* Секция профиля */}
        <section className="bg-base-100 p-4 md:p-6 rounded-2xl border border-white/5 shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 p-4 bg-base-200/50 rounded-xl relative">
            <div className="flex items-center gap-4 flex-1">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={56}
                  height={56}
                  className="rounded-full border-2 md:w-[64px] md:h-[64px]"
                />
              ) : (
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-primary-content">
                  {session.user.name?.[0] || session.user.email?.[0]}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-lg leading-tight truncate">
                  {session.user.name}
                </p>
                <p className="text-sm text-base-content/60 italic truncate">
                  {session.user.email}
                </p>
              </div>
            </div>

            {/* На мобилках Logout будет либо в углу, либо под текстом */}
            <div className="md:static">
              <ButtonLogout />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-base-content/50 tracking-wider">
                External ID
              </span>
              <span className="text-xs text-base-content/30 break-all font-mono">
                {session.user.id}
              </span>
            </div>
          </div>
        </section>

        {/* Секция Данных (ЕС GDPR) */}
        <section className="bg-base-100 p-4 md:p-6 rounded-2xl border border-white/5 shadow-xl">
          <h2 className="text-lg font-semibold mb-2">Privacy & Data</h2>
          <p className="text-sm text-base-content/70 mb-6">
            Manage your personal information and how we handle it.
          </p>

          <div className="flex flex-col gap-4">
            {/* Download Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-base-200/50 rounded-xl gap-4">
              <div>
                <p className="font-medium text-sm">Download your data</p>
                <p className="text-xs text-base-content/50">
                  Get a copy of all your subscriptions in JSON format.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <ButtonDownloadData subscriptions={subscriptions} />
              </div>
            </div>

            {/* Delete Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-error/20 bg-error/5 rounded-xl gap-4">
              <div>
                <p className="font-medium text-sm text-error">Delete Account</p>
                <p className="text-xs text-error/60">
                  Permanently remove all your data. This cannot be undone.
                </p>
              </div>
              <div className="w-full md:w-auto text-right">
                <ButtonDeleteAccount />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
