export const ALL_STATUSES = [
  {
    label: "Active",
    color: "text-success border-success",
    description: "Payment is far away, everything is fine.",
  },
  {
    label: "Upcoming",
    color: "text-warning border-warning",
    description: "Payment is due within 7 days. Get ready!",
  },
  {
    label: "Warning",
    color: "text-error border-error",
    description: "Payment is due TOMORROW!",
  },
];

export const getBadgeProps = (diffDays) => {
  // Если списание сегодня или завтра
  if (diffDays <= 1)
    return {
      text: "Warning",
      className: "bg-error text-error-content border-none rounded-[8px]",
    };

  // Если списание в течение недели (от 2 до 7 дней)
  if (diffDays <= 7)
    return {
      text: "Upcoming",
      className: "bg-warning text-warning-content border-none rounded-[8px]",
    };

  return {
    text: "Active",
    className: "bg-success text-success-content border-none rounded-[8px]",
  };
};

export const getSubData = (sub) => {
  const createdAt = new Date(sub.createdAt);
  const nextChargeDate = new Date(sub.nextCharge || sub.createdAt);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Логика авто-расчета следующей даты, если она не установлена
  const isDefaultDate = Math.abs(nextChargeDate - createdAt) < 1000;

  if (isDefaultDate || !sub.nextCharge) {
    if (sub.unit === "/mo") nextChargeDate.setMonth(createdAt.getMonth() + 1);
    else if (sub.unit === "/y")
      nextChargeDate.setFullYear(createdAt.getFullYear() + 1);
    else if (sub.unit === "/wk")
      nextChargeDate.setDate(createdAt.getDate() + 7);
  }

  const diffTime = nextChargeDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    nextChargeDate,
    diffDays,
    badge: getBadgeProps(diffDays),
    today,
  };
};
