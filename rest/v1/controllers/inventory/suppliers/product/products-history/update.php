<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product_history = new ProductsHistory($conn);
// get $_GET data
// check if stockid is in the url e.g. /stockid/1
$error = [];
$returnData = [];
if (array_key_exists("productHistoryId", $_GET)) {
    // check data
    checkPayload($data);
    // get productHistoryId from query string

    $product_history->product_history_aid = $_GET['productHistoryId'];
    $product_history->product_history_date = checkIndex($data, "product_history_date");
    $product_history->product_history_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($product_history->product_history_aid);
    // update
    $query = checkUpdate($product_history);
    returnSuccess($product_history, "product history", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
