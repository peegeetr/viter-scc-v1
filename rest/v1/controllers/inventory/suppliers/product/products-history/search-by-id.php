<?php

// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../../models/inventory/suppliers/product/ProductsHistory.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product_history = new ProductsHistory($conn);
$response = new Response();
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("search", $_GET) && array_key_exists("productHistoryId", $_GET)) {
        // get data
        $product_history->product_history_product_id = $_GET['productHistoryId'];
        // get task id from query string
        $product_history->product_history_search = $_GET['search'];
        //check to see if search keyword in query string is not empty and less than 50 chars
        checkKeyword($product_history->product_history_search);
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($product_history->product_history_product_id);

        $query = checkSearchById($product_history);
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
