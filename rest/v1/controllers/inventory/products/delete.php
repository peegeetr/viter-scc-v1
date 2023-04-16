<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product = new Product($conn);
// get $_GET data
// check if productid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("productid", $_GET)) {

    // get task id from query string
    $product->product_aid  = $_GET['productid'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($product->product_aid);
    // delete
    $query = checkDelete($product);

    returnSuccess($product, "product", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
