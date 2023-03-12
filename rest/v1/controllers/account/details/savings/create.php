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
$savings->savings_amount = checkIndex($data, "savings_amount");
$savings->savings_balance = checkIndex($data, "savings_balance");
$savings->savings_total = checkIndex($data, "savings_total");
$savings->savings_date = checkIndex($data, "savings_date"); 
$savings->savings_created = date("Y-m-d H:i:s");
$savings->savings_datetime = date("Y-m-d H:i:s"); 
 
// create
$query = checkCreate($savings); 

returnSuccess($savings, "savings", $query);
