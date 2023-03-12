<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$savings = new Savings($conn);
// get $_GET data
// check if savingsid is in the url e.g. /savingsid/1
$error = [];
$returnData = [];
if (array_key_exists("savingsid", $_GET)) {
    // check data
    checkPayload($data); 
    // get savingsid from query string
    $savings->savings_aid = $_GET['savingsid']; 
    $savings->savings_amount = checkIndex($data, "savings_amount");
    $savings->savings_balance = checkIndex($data, "savings_balance");
    $savings->savings_total = checkIndex($data, "savings_total");
    $savings->savings_date = checkIndex($data, "savings_date"); 
    $savings->savings_datetime = date("Y-m-d H:i:s");
 
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($savings->savings_aid); 
    // update
    $query = checkUpdate($savings);
    returnSuccess($savings, "savings", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
