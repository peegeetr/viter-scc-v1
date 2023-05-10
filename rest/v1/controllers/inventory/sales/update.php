<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$sales = new Sales($conn);
// get $_GET data
// check if ordersid is in the url e.g. /ordersid/1
$error = [];
$returnData = [];
if (array_key_exists("salesid", $_GET)) {
    // check data
    checkPayload($data);
    // get ordersid from query string
    $sales->sales_aid = $_GET['salesid'];
    $sales->sales_order_id = checkIndex($data, "sales_order_id");
    $sales->sales_receive_amount = checkIndex($data, "sales_receive_amount");
    $sales->sales_member_change = checkIndex($data, "sales_member_change");
    $sales->sales_or = checkIndex($data, "sales_or");
    $sales->sales_is_paid = 1;
    $sales->sales_date = date("Y-m-d H:i:s");
    $sales->sales_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($sales->sales_aid);
    // update 
    $query = checkUpdate($sales);
    checkIsPaidOrder($sales);
    returnSuccess($sales, "Sales", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
