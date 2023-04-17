<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$category = new Category($conn);
// get should not be present
if (array_key_exists("categoryid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$category->product_category_name = checkIndex($data, "product_category_name");
$category->product_category_is_active = 1;
$category->product_category_created = date("Y-m-d H:i:s");
$category->product_category_datetime = date("Y-m-d H:i:s");

// check name
isNameExist($category, $category->product_category_name);
// create
$query = checkCreate($category);

returnSuccess($category, "Category", $query);
