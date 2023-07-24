export const getIfSubscribeCapitalIsExist = (item, subscribe) => {
  let result = false;

  subscribe?.map((sItem) => {
    if (sItem.subscribe_capital_aid === item.subscribe_capital_aid) {
      result = true;
    }
  });
  return result;
};
