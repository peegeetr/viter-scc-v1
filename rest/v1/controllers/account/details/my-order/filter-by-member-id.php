<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/account/details/MyOrders.php'; 
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$order = new MyOrders($conn);
$response = new Response();
// get data
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);
    if (array_key_exists("membersid", $_GET)) {
        // get task id from query string
        $order->orders_member_id = $_GET['membersid'];

        $allValues = $data['value'];

        $order->orders_from = checkIndex($allValues, "start_date");
        $order->orders_to = checkIndex($allValues, "end_date");
        //check to see if search keyword in query string is not empty and less than 50 chars
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
