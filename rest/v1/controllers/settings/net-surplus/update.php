<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$net = new NetSurplus($conn);
// get $_GET data
// check if netId is in the url e.g. /netId/1
$error = [];
$returnData = [];
if (array_key_exists("netId", $_GET)) {
    // check data
    checkPayload($data);
    // get netId from query string
    $net->net_surplus_aid = $_GET['netId'];
    $net->net_surplus_amount = checkIndex($data, "net_surplus_amount");
    $net->net_surplus_total_capital = checkIndex($data, "net_surplus_total_capital");
    $net->net_surplus_total_profit = checkIndex($data, "net_surplus_total_profit");
    $net->net_surplus_dividend = checkIndex($data, "net_surplus_dividend");
    $net->net_surplus_patronage_refund = checkIndex($data, "net_surplus_patronage_refund");
    $net->net_surplus_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($net->net_surplus_aid);
    // update
    $query = checkUpdate($net);
    returnSuccess($net, "net surplus", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
