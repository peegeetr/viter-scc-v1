<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$official_receipt = new OfficialReceipt($conn);
// get $_GET data
// check if fileid is in the url e.g. /fileid/1
$error = [];
$returnData = [];
if (array_key_exists("officaialReceiptId", $_GET)) {
    // check data
    checkPayload($data);
    // get officaialReceiptId from query string
    $official_receipt->or_invoice_aid = $_GET['officaialReceiptId'];
    $official_receipt->or_invoice_date = checkIndex($data, "or_invoice_date");
    $official_receipt->or_invoice_or_no = checkIndex($data, "or_invoice_or_no");
    $official_receipt->or_invoice_payee_id = checkIndex($data, "or_invoice_payee_id");
    $official_receipt->or_invoice_amount = checkIndex($data, "or_invoice_amount");
    $official_receipt->or_invoice_remarks = checkIndex($data, "or_invoice_remarks");
    $official_receipt->or_invoice_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($official_receipt->or_invoice_aid);
    // update
    $query = checkUpdate($official_receipt);
    returnSuccess($official_receipt, "official receipt", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
