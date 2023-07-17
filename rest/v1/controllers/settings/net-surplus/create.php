<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$net = new NetSurplus($conn);
// get should not be present
if (array_key_exists("netId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$id = "";
$year = date("Y");
$lastNetId = $net->readLastNetId();
if ($lastNetId->rowCount() == 0) {
    $id = "NS-$year-001";
} else {
    $row = $lastNetId->fetch(PDO::FETCH_ASSOC);
    extract($row);
    $existingMeberId = explode("-", $net_surplus_id);
    $lastId =  intval($existingNetId[1]) + 1;

    if ($lastId < 10) {
        $id = "NS-$year-00" . $lastId;
    } elseif ($lastId < 100) {
        $id = "NS-$year-0" . $lastId;
    } else {
        $id = "NS-$year-$lastId";
    }
}


checkKeyword($id);
$net->net_surplus_id = $id;
$net->net_surplus_before_amount = checkIndex($data, "net_surplus_before_amount");
$net->net_surplus_distribution_amount = checkIndex($data, "net_surplus_distribution_amount");
$net->net_surplus_operating_expenses = checkIndex($data, "net_surplus_operating_expenses");
$net->net_surplus_total_income = checkIndex($data, "net_surplus_total_income");
$net->net_surplus_general_reserve = checkIndex($data, "net_surplus_general_reserve");
$net->net_surplus_general_reserve_rate = checkIndex($data, "net_surplus_general_reserve_rate");
$net->net_surplus_educ_training = checkIndex($data, "net_surplus_educ_training");
$net->net_surplus_educ_training_rate = checkIndex($data, "net_surplus_educ_training_rate");
$net->net_surplus_community_dev = checkIndex($data, "net_surplus_community_dev");
$net->net_surplus_community_dev_rate = checkIndex($data, "net_surplus_community_dev_rate");
$net->net_surplus_optional_fund = checkIndex($data, "net_surplus_optional_fund");
$net->net_surplus_optional_fund_rate = checkIndex($data, "net_surplus_optional_fund_rate");
$net->net_surplus_dividend = checkIndex($data, "net_surplus_dividend");
$net->net_surplus_dividend_rate = checkIndex($data, "net_surplus_dividend_rate");
$net->net_surplus_patronage_refund = checkIndex($data, "net_surplus_patronage_refund");
$net->net_surplus_patronage_rate = checkIndex($data, "net_surplus_patronage_rate");
$net->net_surplus_created = date("Y-m-d H:i:s");
$net->net_surplus_datetime = date("Y-m-d H:i:s");

// create
$query = checkCreate($net);

returnSuccess($net, "net surplus", $query);
