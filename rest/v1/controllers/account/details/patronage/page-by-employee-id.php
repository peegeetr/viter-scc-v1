<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/inventory/orders/Orders.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$order = new Orders($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET) && array_key_exists("membersid", $_GET)) {
        // get data
        // get task id from query string
        $order->orders_member_id = $_GET['membersid'];
        $order->orders_start = $_GET['start'];
        $order->total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($order->orders_start, $order->total);
        $query = checkReadLimitById($order);
        $total_result = checkReadById($order);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $order->total;
        $returnData["page"] = (int)$order->orders_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $order->total);
        $returnData["success"] = true;
        $response->setData($returnData);
        $response->send();
        exit;
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
