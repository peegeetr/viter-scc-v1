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
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("startDate", $_GET) && array_key_exists("endDate", $_GET) && array_key_exists("membersid", $_GET)) {
        // get data
        // get task id from query string
        $order->orders_member_id = $_GET['membersid'];
        $order->orders_from = $_GET['startDate'];
        $order->orders_to = $_GET['endDate'];
        //check to see if search keyword in query string is not empty and less than 50 chars
        checkKeyword($order->orders_from);
        checkKeyword($order->orders_to);
        checkId($order->orders_member_id);
        $query = checkFilterById($order);
        http_response_code(200);
        getQueriedData($query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();