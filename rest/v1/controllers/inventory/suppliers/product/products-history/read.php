<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product_history = new ProductsHistory($conn);
// get $_GET data
// check if stockid is in the url e.g. /file_upload/1
$error = [];
$returnData = [];
if (array_key_exists("productHistoryId", $_GET)) {
    // get task id from query string
    $product_history->product_history_product_id = $_GET['productHistoryId'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($product_history->product_history_product_id);
    $query = checkReadById($product_history);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /file_upload
if (empty($_GET)) {
    $query = checkReadAll($product_history);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
