import { redirect } from "next/navigation";
import connectMongo from "@/libs/mongoose";
import Sub from "@/models/Sub";
import Category from "@/models/Category";
import { auth } from "@/auth";
import Link from "next/link";
import Icon from "@/components/Icon";
import MenuAvatarPopover from "@/components/MenuAvatarPopover";
import ButtonDeleteSub from "@/components/ButtonDeleteSub";
import NoteEditor from "@/components/NoteEditor";
import ButtonEditSub from "@/components/ButtonEditSub";
import { getSubData, ALL_STATUSES, getBadgeProps } from "@/libs/constants";

const getSub = async (subId) => {
  const session = await auth();
  await connectMongo();

  const sub = await Sub.findOne({
    _id: subId,
    userId: session?.user?.id,
  }).populate("categories");

  if (!sub) {
    redirect("/dashboard");
  }

  // const existingCats = await Category.find({}, "name");
  // const existingNames = existingCats.map((c) => c.name);

  // const subObj = sub.toObject();
  // subObj.categories = (subObj.categories || []).filter((cat) =>
  //   existingNames.includes(cat),
  // );

  return sub.toObject();
};

export default async function SubAdminPage({ params }) {
  const { subId } = await params;
  const sub = await getSub(subId);

  const { nextChargeDate, badge, today } = getSubData(sub);
  const createdAt = new Date(sub.createdAt);

  const statusInfo =
    ALL_STATUSES.find((s) => s.label === badge.text) || ALL_STATUSES[0];

  const formattedAddedDate = createdAt.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const formattedNextCharge = nextChargeDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year:
      nextChargeDate.getFullYear() !== today.getFullYear()
        ? "numeric"
        : undefined,
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
          <div className="flex justify-between items-baseline">
            <div className="flex items-center flex-wrap gap-1 gap-y-2 mb-2">
              <h3 className="text-xl text-white font-medium leading-tight capitalize mr-4">
                <span className="text-2xl leading-tight -ml-1">{sub.icon}</span>
                {sub.name}
              </h3>
              <div
                className={`relative px-2 py-0.5 text-sm font-medium ${badge.className} rounded-lg`}
              >
                {badge.text}

                <div
                  className="tooltip tooltip-top before:max-w-40 before:text-xs before:font-normal absolute -top-1 -right-1"
                  data-tip={statusInfo.description}
                >
                  <span
                    className={`flex items-center justify-center w-3.5 h-3.5 rounded-full border text-[10px] font-bold cursor-help ${badge.className}`}
                  >
                    ?
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <ButtonEditSub subId={sub._id.toString()} />
              <ButtonDeleteSub subId={sub._id.toString()} />
            </div>
          </div>
          <div className="grid md:grid-cols-[1fr_1fr] grid-cols-1 gap-x-4 gap-y-6 items-start">
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
                      key={cat._id.toString()}
                      className="text-xs px-2.5 py-1 bg-base-200 text-base-content/80 rounded-lg border border-white/5"
                    >
                      {cat.name}
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
