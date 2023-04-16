<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$category = new Category($conn);
// get $_GET data
// check if categoryid is in the url e.g. /categoryid/1
$error = [];
$returnData = [];
if (array_key_exists("categoryid", $_GET)) {
    // check data
    checkPayload($data); 
    // get categoryid from query string
    $category->product_category_aid  = $_GET['categoryid'];
    $category->product_category_name = checkIndex($data, "product_category_name");
    $category->product_category_product_id = checkIndex($data, "product_category_product_id");
    $category->product_category_datetime = date("Y-m-d H:i:s");

    $product_category_name_old = checkIndex($data, "product_category_name_old");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($category->product_category_aid );
    // check name
    compareName($category, $product_category_name_old, $category->product_category_name);
    // update
    $query = checkUpdate($category);
    returnSuccess($category, "Category", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
