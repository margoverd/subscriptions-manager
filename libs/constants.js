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
  const createdAt = new Date(sub.createdAt || Date.now());

  // 1. Берем дату из базы (если есть) или используем дату создания
  let nextChargeDate = sub.nextCharge
    ? new Date(sub.nextCharge)
    : new Date(createdAt);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Обнуляем время для точности

  // 2. ЦИКЛ АВТООБНОВЛЕНИЯ:
  // Если дата платежа уже в прошлом (меньше сегодня),
  // прибавляем период, пока она не станет будущей или сегодняшней.
  // Это заставляет подписку "идти по кругу"
  if (sub.unit) {
    while (nextChargeDate < today) {
      if (sub.unit === "/mo") {
        nextChargeDate.setMonth(nextChargeDate.getMonth() + 1);
      } else if (sub.unit === "/y") {
        nextChargeDate.setFullYear(nextChargeDate.getFullYear() + 1);
      } else if (sub.unit === "/wk") {
        nextChargeDate.setDate(nextChargeDate.getDate() + 7);
      } else {
        break; // Если юнит странный, выходим из цикла
      }
    }
  }

  // 3. Считаем разницу в днях уже для обновленной даты
  const compareTarget = new Date(nextChargeDate);
  compareTarget.setHours(0, 0, 0, 0);

  const diffTime = compareTarget - today;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  return {
    nextChargeDate,
    diffDays,
    badge: getBadgeProps(diffDays),
    today,
  };
};
