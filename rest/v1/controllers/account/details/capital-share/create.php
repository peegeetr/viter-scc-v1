<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$share = new CapitalShare($conn);
// get should not be present
if (array_key_exists("shareid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$share->capital_share_member_id = checkIndex($data, "capital_share_member_id");
$share->capital_share_paid_up = checkIndex($data, "capital_share_paid_up");
$share->capital_share_total_amount = checkIndex($data, "capital_share_total_amount");
$share->capital_share_or = checkIndex($data, "capital_share_or");
$share->capital_share_date = checkIndex($data, "capital_share_date");
$share->capital_share_created = date("Y-m-d H:i:s");
$share->capital_share_datetime = date("Y-m-d H:i:s");

// create
$query = checkCreate($share);

returnSuccess($share, "Capital Share", $query);
