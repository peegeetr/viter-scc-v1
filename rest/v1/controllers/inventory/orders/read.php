<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$order = new Orders($conn);
// get $_GET data
// check if orderid is in the url e.g. /savings/1
$error = [];
$returnData = [];
if (array_key_exists("orderid", $_GET)) {
    // get task id from query string
    $order->orders_aid  = $_GET['orderid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($order->orders_aid);
    $query = checkReadById($order);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /savings
if (empty($_GET)) {
    $query = checkReadAll($order);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
