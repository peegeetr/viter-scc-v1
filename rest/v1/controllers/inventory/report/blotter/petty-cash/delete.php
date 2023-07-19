<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$pettyCash = new PettyCash($conn);
// get $_GET data
// check if fileid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("pettyCashId", $_GET)) {

    // get task id from query string
    $pettyCash->petty_cash_aid = $_GET['pettyCashId'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($pettyCash->petty_cash_aid);
    // delete
    $query = checkDelete($pettyCash);

    returnSuccess($pettyCash, "petty cash", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
