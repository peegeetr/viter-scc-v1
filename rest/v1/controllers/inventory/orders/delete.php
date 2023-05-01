<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$order = new Orders($conn);
// get $_GET data
// check if orderid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("orderid", $_GET)) {

    // get task id from query string
    $order->orders_aid = $_GET['orderid'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($order->orders_aid);
    // // update sold if remove
    // checkUpdateQunatity($order);
    // delete
    $query = checkDelete($order);

    returnSuccess($order, "order", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
