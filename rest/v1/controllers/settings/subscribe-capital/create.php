<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$subscribe_capital = new SubscribeCapital($conn);
// get should not be present
if (array_key_exists("subscribeCapitalId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$subscribe_capital->subscribe_capital_amount = checkIndex($data, "subscribe_capital_amount");
$subscribe_capital->subscribe_capital_date = checkIndex($data, "subscribe_capital_date");
$subscribe_capital->subscribe_capital_is_active = 1;
$subscribe_capital->subscribe_capital_created = date("Y-m-d H:i:s");
$subscribe_capital->subscribe_capital_datetime = date("Y-m-d H:i:s");

// check if have active status
haveActive($subscribe_capital);

// create
$query = checkCreate($subscribe_capital);

returnSuccess($subscribe_capital, "Subscribe Capital", $query);
