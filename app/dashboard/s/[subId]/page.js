import { redirect } from "next/navigation";
import connectMongo from "@/libs/mongoose";
import Sub from "@/models/Sub";
import { auth } from "@/auth";
import Link from "next/link";
import Icon from "@/components/Icon";
import MenuAvatarPopover from "@/components/MenuAvatarPopover";

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
  const { subId } = params;

  const sub = await getSub(subId);

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
                className={`px-3 py-0.5 text-sm font-normal rounded-lg bg-success/20 text-success border-success/20`}
              >
                Active
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
              <button
                // onClick={handleDeleteSub}
                className="btn btn-ghost btn-circle text-error border-none shadow-none hover:bg-error/20"
                aria-label="Delete Sub"
              >
                <Icon name="trash-alt" className="text-xl" />
              </button>
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
                {["Cat 1", "Project 2", "Project 3"].map((cat) => {
                  return (
                    <button
                      key={cat}
                      className={`text-sm px-2 py-0.5 bg-base-200 rounded-lg`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              <p className="text-sm text-base-content/70 mb-1">
                Added: <span className="text-base-content">01.16.2026</span>
              </p>
              <p className="text-sm font-normal text-base-content/70">
                Next charge: <span className="text-base-content">Sep 20</span>
              </p>
            </div>
            <div>
              <p className="text-base mb-2 font-normal text-base-content/70">
                Note:
              </p>
              {/* реализовать полноценный редактор, чтобы не нужно было переходить по кнопке редактировать чтобы сохранить заметку. нужно чтобы там как в ProjectPicker была своя кнопка отредактировать (она находится в правом верхнем углу, абсолютом внутри, отступы 16пк.), при редактировании появлялась бы снизу кнопка сохранить или происходило бы авто сохранение, под полем, там должно быть написано на английском сохраняется и после авто сохранено.*/}
              <textarea
                type="text"
                rows={7}
                className="text-base-content/90 whitespace-pre-line wrap-break-words w-full overflow-auto bg-base-200 border-base-100 rounded-xl h-full p-4 text-xs focus:border-base-content/80"
                placeholder="Add a comment or reminder..."
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
