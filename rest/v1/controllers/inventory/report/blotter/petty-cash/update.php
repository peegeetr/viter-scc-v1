<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$pettyCash = new PettyCash($conn);
// get $_GET data
// check if fileid is in the url e.g. /fileid/1
$error = [];
$returnData = [];
if (array_key_exists("pettyCashId", $_GET)) {
    // check data
    checkPayload($data);
    // get pettyCashId from query string
    $pettyCash->petty_cash_aid = $_GET['pettyCashId'];
    $pettyCash->petty_cash_date = checkIndex($data, "petty_cash_date");
    $pettyCash->petty_cash_voucher_no = checkIndex($data, "petty_cash_voucher_no");
    $pettyCash->petty_cash_payee_name = checkIndex($data, "petty_cash_payee_name");
    $pettyCash->petty_cash_in = checkIndex($data, "petty_cash_in");
    $pettyCash->petty_cash_out = checkIndex($data, "petty_cash_out");
    $pettyCash->petty_cash_balance = checkIndex($data, "petty_cash_balance");
    $pettyCash->petty_cash_remarks = checkIndex($data, "petty_cash_remarks");
    $pettyCash->petty_cash_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($pettyCash->petty_cash_aid);
    compareVoucher($pettyCash, $data["petty_cash_voucher_no_old"], $pettyCash->petty_cash_voucher_no);
    // update
    $query = checkUpdate($pettyCash);
    returnSuccess($pettyCash, "petty cash", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
