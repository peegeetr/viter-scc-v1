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
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if stocksid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("productHistoryId", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $product_history->product_history_aid = $_GET['productHistoryId'];
        $product_history->product_history_is_active = trim($data["isActive"]);
        $product_history->product_history_datetime = date("Y-m-d H:i:s");
        checkId($product_history->product_history_aid);

        $allItem = $data["item"];

        if (count($allItem) > 0) {
            $product_history->product_history_product_id = $allItem["product_history_product_id"];
            $product_history->product_history_price = $allItem["product_history_price"];
        }
        checkKeyword($product_history->product_history_price);

        // if archive
        if ($product_history->product_history_is_active === "0") {
            $product_history->product_history_price = "";
        }
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($product_history->product_history_product_id);
        haveActiveNotById($product_history);

        // check if have order is pending 
        checkAssociationInOrderPending($product_history);
        $query = checkActive($product_history);
        // update price
        checkUpdateSupplierPrice($product_history);
        http_response_code(200);
        returnSuccess($product_history, "product history", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
