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

$valPrice = $data["valuePrice"];
$product_history->product_history_product_id = checkIndex($data, "product_history_product_id");
$product_history->product_history_date = checkIndex($data, "product_history_date");
$product_history->product_history_price = checkIndex($valPrice, "product_history_price");
$product_history->product_history_scc_price = checkIndex($valPrice, "product_history_scc_price");
$product_history->product_history_retail_price = checkIndex($valPrice, "product_history_retail_price");
$product_history->product_history_is_active = 1;
$product_history->product_history_created = date("Y-m-d H:i:s");
$product_history->product_history_datetime = date("Y-m-d H:i:s");

$stockQty = 0;
$orderQty = 0;

// create
haveActiveById($product_history);
isProductHistoryExist($product_history);

$stock = $product_history->readStockGroupByProduct();
$order = $product_history->readOrderGroupByProduct();

// update if first load
if ($stock->rowCount() > 0) {
    $row = $stock->fetch(PDO::FETCH_ASSOC);
    extract($row);
    $stockQty = $stockQuantity;
}

// update if first load
if ($order->rowCount() > 0) {
    $row = $order->fetch(PDO::FETCH_ASSOC);
    extract($row);
    $orderQty = $orderQuantity;
}

$totalQuantity = ($stockQty - $orderQty);

if ($totalQuantity > 0) {
    resultError("You cannot add new price, because you have $totalQuantity qty of this product.");
}

$query = checkCreate($product_history);
checkUpdateSupplierPrice($product_history);

returnSuccess($product_history, "product history", $query);
