<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$pettyCash = new PettyCash($conn);
// get should not be present
if (array_key_exists("pettyCashId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$pettyCash->petty_cash_date = checkIndex($data, "petty_cash_date");
$pettyCash->petty_cash_voucher_no = checkIndex($data, "petty_cash_voucher_no");
$pettyCash->petty_cash_payee_id = checkIndex($data, "petty_cash_payee_id");
$pettyCash->petty_cash_in = checkIndex($data, "petty_cash_in");
$pettyCash->petty_cash_out = checkIndex($data, "petty_cash_out");
$pettyCash->petty_cash_balance = checkIndex($data, "petty_cash_balance");
$pettyCash->petty_cash_created = date("Y-m-d H:i:s");
$pettyCash->petty_cash_datetime = date("Y-m-d H:i:s");

// create
$query = checkCreate($pettyCash);

returnSuccess($pettyCash, "petty cash", $query);
