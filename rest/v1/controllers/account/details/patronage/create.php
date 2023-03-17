<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$patronage = new Patronage($conn);
// get should not be present
if (array_key_exists("savingsid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$patronage->patronage_member_id = checkIndex($data, "patronage_member_id");
$patronage->patronage_product_id = checkIndex($data, "patronage_product_id");
$patronage->patronage_product_quantity = checkIndex($data, "patronage_product_quantity");
$patronage->patronage_product_amount = checkIndex($data, "patronage_product_amount");
$patronage->patronage_date = checkIndex($data, "patronage_date");
$patronage->patronage_or = checkIndex($data, "patronage_or");
$patronage->patronage_created = date("Y-m-d H:i:s");
$patronage->patronage_datetime = date("Y-m-d H:i:s");

// create
$query = checkCreate($patronage);

returnSuccess($patronage, "savings", $query);
