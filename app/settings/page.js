import Icon from "@/components/Icon";
import MenuAvatarPopover from "@/components/MenuAvatarPopover";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-10">
      <header className="max-full mx-auto pb-6 flex justify-between items-center">
        <Link
          href="/dashboard"
          aria-label="Back to Dashboard"
          className="flex items-center gap-2 group text-base-content/70 hover:text-base-content transition-colors"
        >
          <Icon
            name="angle-left"
            className="text-xl transform transition-transform duration-200 group-hover:-translate-x-1"
          />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl">Account Settings</h1>

        <MenuAvatarPopover />
      </header>

      <div className="space-y-8">
        {/* Секция Email */}
        <section className="bg-base-100 p-6 rounded-2xl border border-white/5 shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Email Address</h2>
          <p className="text-sm text-base-content/70 mb-4">
            Current email:{" "}
            <span className="text-base-content">user@example.com</span>
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="New email address"
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary w-fit shadow-none">
              Update Email
            </button>
          </div>
        </section>

        {/* Секция Данных (ЕС GDPR) */}
        <section className="bg-base-100 p-6 rounded-2xl border border-white/5 shadow-xl">
          <h2 className="text-lg font-semibold mb-2">Privacy & Data</h2>
          <p className="text-sm text-base-content/70 mb-6">
            Manage your personal information and how we handle it.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-4 bg-base-200/50 rounded-xl">
              <div>
                <p className="font-medium text-sm shadow-none">
                  Download your data
                </p>
                <p className="text-xs text-base-content/50">
                  Get a copy of all your subscriptions in JSON format.
                </p>
              </div>
              <button className="btn btn-outline btn-sm">Download</button>
            </div>

            <div className="flex items-center justify-between p-4 border border-error/20 bg-error/5 rounded-xl">
              <div>
                <p className="font-medium text-sm text-error">Delete Account</p>
                <p className="text-xs text-error/60">
                  Permanently remove all your data. This cannot be undone.
                </p>
              </div>
              <button className="btn btn-error btn-sm shadow-none">
                Delete
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
