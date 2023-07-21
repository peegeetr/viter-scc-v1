<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$amortization = new Amortization($conn);
// get should not be present
if (array_key_exists("shareid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$amortization->capital_amortization_member_id = checkIndex($data, "capital_amortization_member_id");
$amortization->capital_amortization_amount = checkIndex($data, "capital_amortization_amount");
$amortization->capital_amortization_date = checkIndex($data, "capital_amortization_date");
$amortization->capital_amortization_amount_dividend = checkIndex($data, "capital_amortization_amount_dividend");
$amortization->capital_amortization_amount_patronage = checkIndex($data, "capital_amortization_amount_patronage");
$amortization->capital_amortization_remarks = $data["capital_amortization_remarks"];
$amortization->capital_amortization_is_active = 1;
$amortization->capital_amortization_created = date("Y-m-d H:i:s");
$amortization->capital_amortization_datetime = date("Y-m-d H:i:s");

// create
haveActiveById($amortization);
$query = checkCreate($amortization);

returnSuccess($amortization, "Amortization", $query);
