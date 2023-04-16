<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product = new Product($conn);
// get $_GET data
// check if productid is in the url e.g. /productid/1
$error = [];
$returnData = [];
if (array_key_exists("productid", $_GET)) {
    // check data
    checkPayload($data);
    // get productid from query string
    $product->product_aid = $_GET['productid'];
    $product->product_item_name = checkIndex($data, "product_item_name");
    $product->product_supplier_id = checkIndex($data, "product_supplier_id");
    $product->product_date = checkIndex($data, "product_date"); 
    $product->product_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($product->product_aid);
    // update
    $query = checkUpdate($product);
    returnSuccess($product, "product", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
