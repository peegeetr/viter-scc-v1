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
$lastNetId = $net->readAll();
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
$net->net_surplus_amount = checkIndex($data, "net_surplus_amount");
$net->net_surplus_total_capital = checkIndex($data, "net_surplus_total_capital");
$net->net_surplus_total_profit = checkIndex($data, "net_surplus_total_profit");
$net->net_surplus_dividend = checkIndex($data, "net_surplus_dividend");
$net->net_surplus_patronage_refund = checkIndex($data, "net_surplus_patronage_refund");
$net->net_surplus_created = date("Y-m-d H:i:s");
$net->net_surplus_datetime = date("Y-m-d H:i:s");

// create
$query = checkCreate($net);

returnSuccess($net, "net surplus", $query);
