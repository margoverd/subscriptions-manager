import { redirect } from "next/navigation";
import connectMongo from "@/libs/mongoose";
import Sub from "@/models/Sub";
import { auth } from "@/auth";
import Link from "next/link";
import Icon from "@/components/Icon";
import MenuAvatarPopover from "@/components/MenuAvatarPopover";
import ButtonDeleteSub from "@/components/ButtonDeleteSub";
import NoteEditor from "@/components/NoteEditor";

const getSub = async (subId) => {
  const session = await auth();

  await connectMongo();

  const sub = await Sub.findOne({
    _id: subId,
    userId: session?.user?.id,
  });

  if (!sub) {
    redirect("/dashboard");
  }

  return sub;
};

export default async function SubAdminPage({ params }) {
  const { subId } = await params;
  const sub = await getSub(subId);

  const createdAt = new Date(sub.createdAt);
  const nextChargeDate = new Date(createdAt);

  if (sub.unit === "/mo") nextChargeDate.setMonth(createdAt.getMonth() + 1);
  else if (sub.unit === "/y")
    nextChargeDate.setFullYear(createdAt.getFullYear() + 1);
  else if (sub.unit === "/wk") nextChargeDate.setDate(createdAt.getDate() + 7);

  const today = new Date();
  const diffTime = nextChargeDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let badgeText = "Active";
  let badgeClass = "bg-success/20 text-success border-success/20";

  if (diffDays <= 3) {
    badgeText = "Warning";
    badgeClass = "bg-error/20 text-error border-error/20";
  } else if (diffDays <= 7) {
    badgeText = "Upcoming";
    badgeClass = "bg-warning/20 text-warning border-warning/20";
  }

  const formattedAddedDate = createdAt.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const formattedNextCharge = nextChargeDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <main className="bg-base-200">
      <header className="max-w-4xl px-4 mx-auto py-4 flex justify-between items-center">
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
        <MenuAvatarPopover />
      </header>

      <div className="max-w-4xl mx-auto px-4">
        <nav className="text-sm text-base-content/70 flex items-center gap-2 mb-4">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-base-content font-medium truncate">
            {sub.name}
          </span>
        </nav>

        <div className="bg-base-100 rounded-xl md:p-6 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-wrap gap-1 gap-y-2 mb-2">
              <span className="text-2xl leading-tight -ml-1">{sub.icon}</span>
              <h3 className="text-xl text-white font-normal leading-tight capitalize mr-4">
                {sub.name}
              </h3>
              <span
                className={`px-3 py-0.5 text-sm font-normal rounded-lg bg-success/20 text-success border-success/20 ${badgeClass}`}
              >
                {badgeText}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                // onClick={handleEditSub}
                className="btn btn-ghost btn-circle shadow-none border-none hover:bg-base-content/20 text-base-content"
                aria-label="Edit Sub"
              >
                <Icon name="pen" className="text-xl" />
              </button>
              <ButtonDeleteSub subId={sub._id.toString()} />
            </div>
          </div>
          <div className="grid md:grid-cols-[1fr_1fr] grid-cols-1 gap-4 items-start">
            <div>
              <p className="text-xl font-normal text-white mb-4">
                ${sub.price} {sub.unit}
              </p>

              <p className="text-base mb-1 font-normal text-base-content/70">
                Categories:
              </p>
              <div className="flex flex-wrap gap-1 mb-8">
                {sub.categories && sub.categories.length > 0 ? (
                  sub.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs px-2.5 py-1 bg-base-200 text-base-content/80 rounded-lg border border-white/5"
                    >
                      {cat}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-base-content/30 italic">
                    No categories
                  </span>
                )}
              </div>

              <p className="text-sm text-base-content/70 mb-1">
                Added:{" "}
                <span className="text-base-content">{formattedAddedDate}</span>
              </p>
              <p className="text-sm font-normal text-base-content/70">
                Next charge:{" "}
                <span className="text-base-content">{formattedNextCharge}</span>
              </p>
            </div>
            <NoteEditor subId={sub._id.toString()} initialNote={sub.note} />
          </div>
        </div>
      </div>
    </main>
  );
}
