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
    $sales->sales_receive_amount = checkIndex($data, "sales_receive_amount");
    $sales->sales_or = checkIndex($data, "sales_or");
    $sales->sales_date = checkIndex($data, "orders_date");
    $sales->sales_datetime = date("Y-m-d H:i:s");

    // $sales->sold_product = checkIndex($data, "soldProduct");
    // $sales->remaining_quantity = checkIndex($data, "remainingQuantity");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($sales->sales_aid);
    // update 
    $query = checkUpdate($sales);
    returnSuccess($sales, "Sales", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
