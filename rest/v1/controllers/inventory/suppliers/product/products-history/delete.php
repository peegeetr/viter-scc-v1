<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product_history = new ProductsHistory($conn);
// get $_GET data
// check if stockid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("productHistoryId", $_GET)) {

    // get task id from query string
    $product_history->product_history_aid = $_GET['productHistoryId'];
    $allItem = $data["item"];

    if (count($allItem) > 0) {
        $product_history->product_history_product_id = checkIndex($allItem, "product_history_product_id");
        $product_history->product_history_scc_price = checkIndex($allItem, "product_history_scc_price");
        $product_history->product_history_price = checkIndex($allItem, "product_history_price");
    }

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($product_history->product_history_aid);
    // check if exist in stocks
    isAssociated($product_history);
    // // check if exist in order
    // checkAssociationInOrder($product_history);

    // delete
    $query = checkDelete($product_history);

    returnSuccess($product_history, "product history", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
