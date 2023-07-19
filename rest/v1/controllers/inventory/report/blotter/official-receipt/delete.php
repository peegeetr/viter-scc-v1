<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$official_receipt = new OfficialRecipt($conn);
// get $_GET data
// check if fileid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("officaialReceiptId", $_GET)) {

    // get task id from query string
    $official_receipt->or_invoice_aid = $_GET['officaialReceiptId'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($official_receipt->or_invoice_aid);
    // delete
    $query = checkDelete($official_receipt);

    returnSuccess($official_receipt, "official receipt", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
