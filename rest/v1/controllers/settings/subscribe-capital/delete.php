<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$subscribe_capital = new SubscribeCapital($conn);
// get $_GET data
// check if productid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("subscribeCapitalId", $_GET)) {

    // get task id from query string
    $subscribe_capital->subscribe_capital_aid = $_GET['subscribeCapitalId'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($subscribe_capital->subscribe_capital_aid);
    // delete
    $query = checkDelete($subscribe_capital);

    returnSuccess($subscribe_capital, "Subscribe Capital", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
