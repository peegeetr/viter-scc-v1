<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$savings = new Savings($conn);
// get should not be present
if (array_key_exists("savingsid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$savings->savings_member_id = checkIndex($data, "savings_member_id");
$savings->savings_deposite = checkIndex($data, "savings_deposite");
$savings->savings_withdrawal = checkIndex($data, "savings_withdrawal");
$savings->savings_interest = checkIndex($data, "savings_interest");
$savings->savings_date = checkIndex($data, "savings_date");
$savings->savings_category = checkIndex($data, "savings_category");
$savings->savings_or = checkIndex($data, "savings_or");
$savings->savings_created = date("Y-m-d H:i:s");
$savings->savings_datetime = date("Y-m-d H:i:s");

// create
$query = checkCreate($savings);

returnSuccess($savings, "savings", $query);
