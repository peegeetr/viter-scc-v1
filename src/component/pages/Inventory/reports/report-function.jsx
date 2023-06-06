export const getMonth = () => {
  let monthStart = 0;
  let monthCount = 12;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let list = [];

  for (let i = 0; i < monthCount; i++) {
    monthStart++;
    list.push({
      month_aid: Number(monthStart),
      month_name: `${months[Number(monthStart) - 1]}`,
    });
  }
  return list;
};
export const getCurrentMonth = () => {
  const d = new Date();
  let currentYear = d.getMonth() + 1;
  return currentYear;
};

export const getMonthName = (id) => {
  let monthName = "";
  getMonth()?.map((yItem) => {
    // check if leave type aid is equal
    if (yItem.month_aid === Number(id)) {
      monthName = yItem.month_name;
    }
  });
  return monthName;
};

export const getTotal = (amount, item) => {
  let finalAmount = 0;
  let isPending = 0;
  amount?.data.map((aItem) => {
    if (aItem.members_aid === item.members_aid) {
      finalAmount += Number(aItem.orders_product_amount);
      isPending = aItem.orders_is_paid;
    }
  });
  return { finalAmount, isPending };
};
