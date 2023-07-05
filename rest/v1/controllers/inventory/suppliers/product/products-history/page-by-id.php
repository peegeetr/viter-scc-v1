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
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET) && array_key_exists("productHistoryId", $_GET)) {
        // get data
        // get task id from query string
        $product_history->product_history_product_id = $_GET['productHistoryId'];
        $product_history->product_history_start = $_GET['start'];
        $product_history->product_history_total = 20;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($product_history->product_history_start, $product_history->product_history_total);
        $query = checkReadByIdLimit($product_history);
        $total_result = checkReadById($product_history);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $product_history->product_history_total;
        $returnData["page"] = (int)$product_history->product_history_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $product_history->product_history_total);
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
