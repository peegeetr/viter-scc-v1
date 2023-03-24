<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product = new Product($conn);
// get should not be present
if (array_key_exists("fileid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$product->product_item_name = checkIndex($data, "product_item_name");
$product->product_date = checkIndex($data, "product_date");
$product->product_quantity = checkIndex($data, "product_quantity");
$product->product_price = checkIndex($data, "product_price");
$product->product_scc_price = checkIndex($data, "product_scc_price");
$product->product_profit = checkIndex($data, "product_profit");
$product->product_market_price = checkIndex($data, "product_market_price");
$product->product_created = date("Y-m-d H:i:s");
$product->product_datetime = date("Y-m-d H:i:s");

// create
$query = checkCreate($product);

returnSuccess($product, "product", $query);
