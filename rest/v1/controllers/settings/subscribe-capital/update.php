<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$subscribe_capital = new SubscribeCapital($conn);
// get $_GET data
// check if subscribeCapitalId is in the url e.g. /subscribeCapitalId/1
$error = [];
$returnData = [];
if (array_key_exists("subscribeCapitalId", $_GET)) {
    // check data
    checkPayload($data);
    // get subscribeCapitalId from query string
    $subscribe_capital->subscribe_capital_aid = $_GET['subscribeCapitalId'];
    $subscribe_capital->subscribe_capital_amount = checkIndex($data, "subscribe_capital_amount");
    $subscribe_capital->subscribe_capital_date = checkIndex($data, "subscribe_capital_date");
    $subscribe_capital->subscribe_capital_is_active = checkIndex($data, "subscribe_capital_is_active");
    $subscribe_capital->subscribe_capital_datetime = date("Y-m-d H:i:s");

    $active_old = checkIndex($data, "is_active_old");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($subscribe_capital->subscribe_capital_aid);
    compareCurrentCapitalIsActive($subscribe_capital, $active_old, $subscribe_capital->subscribe_capital_is_active);
    // haveActive($subscribe_capital, $subscribe_capital->subscribe_capital_amount);
    // update
    $query = checkUpdate($subscribe_capital);
    returnSuccess($subscribe_capital, "subscribe capital", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
