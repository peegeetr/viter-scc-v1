<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product_history = new ProductsHistory($conn);
// get should not be present
if (array_key_exists("productHistoryId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$product_history->product_history_product_id = checkIndex($data, "product_history_product_id");
$product_history->product_history_date = checkIndex($data, "product_history_date");
$product_history->product_history_price = checkIndex($data, "product_history_price");
$product_history->product_history_scc_price = checkIndex($data, "product_history_scc_price");
$product_history->product_history_is_active = 1;
$product_history->product_history_created = date("Y-m-d H:i:s");
$product_history->product_history_datetime = date("Y-m-d H:i:s");

// create
haveActiveById($product_history);
// isProductHistoryExist($product_history);
$query = checkCreate($product_history);
checkUpdateSupplierPrice($product_history);

returnSuccess($product_history, "product history", $query);
