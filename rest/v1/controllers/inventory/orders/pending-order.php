<?php

// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/inventory/orders/Orders.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$order = new Orders($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("memberId", $_GET)) {
        // return 404 error if endpoint not available
        checkEndpoint();
    }
    // if request is a GET e.g. /savings
    if (empty($_GET)) {
        $query = checkReadAllPendingOrder($order);
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
