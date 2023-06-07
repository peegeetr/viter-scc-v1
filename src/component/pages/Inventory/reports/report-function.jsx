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
  let totalAmount = 0;
  let discountAmount = 0;
  let finalAmount = 0;
  let isPending = 1;

  amount?.data.map((aItem) => {
    if (aItem.members_aid === item.members_aid) {
      totalAmount += Number(aItem.orders_product_amount);
      discountAmount += Number(aItem.sales_discount);
      // final Amount
      finalAmount = totalAmount - discountAmount;
    }
    if (aItem.members_aid === item.members_aid && aItem.orders_is_paid === 0) {
      isPending = 0;
    }
  });

  console.log(item.members_aid, finalAmount, isPending);
  return { finalAmount, isPending };
};
