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
    $net->net_surplus_year = checkIndex($data, "net_surplus_year");
    $net->net_surplus_allocation = checkIndex($data, "net_surplus_allocation");
    $net->net_surplus_before_amount = checkIndex($data, "net_surplus_before_amount");
    $net->net_surplus_distribution_amount = checkIndex($data, "net_surplus_distribution_amount");
    $net->net_surplus_operating_expenses = checkIndex($data, "net_surplus_operating_expenses");
    $net->net_surplus_total_income = checkIndex($data, "net_surplus_total_income");
    $net->net_surplus_general_reserve = checkIndex($data, "net_surplus_general_reserve");
    $net->net_surplus_general_reserve_rate = checkIndex($data, "net_surplus_general_reserve_rate");
    $net->net_surplus_educ_training_rate = checkIndex($data, "net_surplus_educ_training_rate");
    $net->net_surplus_community_dev = checkIndex($data, "net_surplus_community_dev");
    $net->net_surplus_community_dev_rate = checkIndex($data, "net_surplus_community_dev_rate");
    $net->net_surplus_optional_fund = checkIndex($data, "net_surplus_optional_fund");
    $net->net_surplus_optional_fund_rate = checkIndex($data, "net_surplus_optional_fund_rate");
    $net->net_surplus_dividend = checkIndex($data, "net_surplus_dividend");
    $net->net_surplus_dividend_rate = checkIndex($data, "net_surplus_dividend_rate");
    $net->net_surplus_patronage_refund = checkIndex($data, "net_surplus_patronage_refund");
    $net->net_surplus_patronage_rate = checkIndex($data, "net_surplus_patronage_rate");
    $net->net_surplus_datetime = date("Y-m-d H:i:s");

    $year_old = $data["net_surplus_year_old"];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($net->net_surplus_aid);
    compareYear($net, $year_old, $net->net_surplus_year);
    // update
    $query = checkUpdate($net);
    returnSuccess($net, "net surplus", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
