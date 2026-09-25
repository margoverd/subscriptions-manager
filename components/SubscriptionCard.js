"use client";

import Link from "next/link";
import { getBadgeProps } from "@/libs/constants";
import { getSubData } from "@/libs/constants";

const SubscriptionCard = ({ sub }) => {
  const { nextChargeDate, badge } = getSubData(sub);

  const isLongName = sub.name.length > 8;

  const displayName = isLongName ? sub.name.slice(0, 8) + "..." : sub.name;

  const formattedDate = nextChargeDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/dashboard/s/${sub._id}`}>
      <div className="group relative bg-base-100 px-6 pb-6 pt-3 rounded-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-transparent hover:border-primary/40">
        <div className="flex justify-between flex-wrap items-center mb-6">
          <div className="flex items-center gap-1">
            <span className="text-2xl leading-tight -ml-1">{sub.icon}</span>
            {isLongName ? (
              <div
                className="tooltip tooltip-top before:text-xs"
                data-tip={sub.name}
              >
                <h3 className="text-xl font-bold text-white leading-tight">
                  {displayName}
                </h3>
              </div>
            ) : (
              <h3 className="text-xl font-bold text-white leading-tight">
                {sub.name}
              </h3>
            )}
          </div>

          <span
            className={`px-1.5 py-0.5 text-sm font-medium ${badge.className} rounded-lg border`}
          >
            {badge.text}
          </span>
        </div>

        <div className="flex flex-col">
          <p className="text-lg font-bold text-white">
            ${sub.price} {sub.unit}
          </p>
          <p className="text-sm font-normal text-base-content/70">
            Next charge: {formattedDate}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SubscriptionCard;
