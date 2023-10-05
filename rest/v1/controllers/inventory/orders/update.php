<?php
// check database connection
require 'functions.php';
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$order = new Orders($conn);
// get $_GET data
// check if ordersid is in the url e.g. /ordersid/1
$error = [];
$returnData = [];
if (array_key_exists("orderid", $_GET)) {
    // check data
    checkPayload($data);
    $allList = $data["list"];
    // get ordersid from query string
    $order->orders_aid = $_GET['orderid'];
    $order->orders_member_id = checkIndex($data, "orders_member_id");
    $order->orders_product_quantity = checkIndex($allList, "orders_product_quantity");
    $order->orders_product_amount = checkIndex($allList, "orders_product_amount");
    $order->orders_product_srp = checkIndex($allList, "orders_product_srp");
    $order->orders_date = checkIndex($data, "orders_date");
    $order->orders_remarks = $data["orders_remarks"];
    $order->orders_is_paid = 0;
    $order->orders_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($order->orders_aid);
    // update 
    checkUpdateSales($order);
    $query = checkUpdate($order);
    returnSuccess($order, "orders", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
