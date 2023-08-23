import { removeComma } from "../../../../../helpers/functions-general";


export const balance = ( item, values,lastBalance ) => {
    const balance =  lastBalance?.data[0].petty_cash_balance
    const petty_cash_in = removeComma(values.petty_cash_in);
    const petty_cash_out = removeComma(values.petty_cash_out);

    const newBalance = item ? removeComma(values.petty_cash_balance):(Number(balance)+Number(petty_cash_in))-Number(petty_cash_out);
 
     return newBalance;
    };