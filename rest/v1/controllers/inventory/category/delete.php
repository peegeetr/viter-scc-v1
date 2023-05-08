<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$category = new Category($conn);
// get $_GET data
// check if categoryid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("categoryid", $_GET)) {

    // get task id from query string
    $category->product_category_aid = $_GET['categoryid'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($category->product_category_aid);

    // delete
    isAssociated($category);
    $query = checkDelete($category);

    returnSuccess($category, "Category", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
