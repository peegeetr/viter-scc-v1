<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$savings = new Savings($conn);
// get $_GET data
// check if savingsid is in the url e.g. /savings/1
$error = [];
$returnData = [];
if (array_key_exists("savingsid", $_GET)) {
    // get task id from query string
    $savings->savings_aid = $_GET['savingsid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($savings->savings_aid);
    $query = checkReadById($savings);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /savings
if (empty($_GET)) {
    $query = checkReadAll($savings);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
