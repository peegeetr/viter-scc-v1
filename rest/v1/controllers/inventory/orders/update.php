<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$order = new Orders($conn);
// get $_GET data
// check if ordersid is in the url e.g. /ordersid/1
$error = [];
$returnData = [];
if (array_key_exists("ordersid", $_GET)) {
    // check data
    checkPayload($data);
    // get ordersid from query string
    $order->orders_aid = $_GET['ordersid'];
    $order->orders_product_id = checkIndex($data, "orders_product_id");
    $order->orders_product_quantity = checkIndex($data, "orders_product_quantity");
    $order->orders_product_amount = checkIndex($data, "orders_product_amount");
    $order->orders_date = checkIndex($data, "orders_date");
    $order->orders_or = checkIndex($data, "orders_or");
    $order->orders_datetime = date("Y-m-d H:i:s");

    // $order->sold_product = checkIndex($data, "soldProduct");
    // $order->remaining_quantity = checkIndex($data, "remainingQuantity");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($order->orders_aid);
    // update 
    $query = checkUpdate($order);
    returnSuccess($order, "orders", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
