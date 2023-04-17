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

$product->product_supplier_id = checkIndex($data, "product_supplier_id");
$product->product_supplier_product_id = checkIndex($data, "product_supplier_product_id");
$product->product_scc_price = checkIndex($data, "product_scc_price");
$product->product_market_price = checkIndex($data, "product_market_price");
$product->product_created = date("Y-m-d H:i:s");
$product->product_datetime = date("Y-m-d H:i:s");

// create product id format ex. (Prod-001) 
$formattedProductId = "";
$id = "";
$productLastId = $product->readLastProductId();
if ($productLastId->rowCount() == 0) {
    // create new id
    $formattedProductId = "Prod" . "-" . "001";
} else {

    $row = $productLastId->fetch(PDO::FETCH_ASSOC);
    extract($row);
    // product_id from existing record ex. (Prod-001)
    $existingMeberId = explode("-", $product_number);

    $lastId =  intval($existingMeberId[1]) + 1;
    if ($lastId < 10) {
        $id = "00" . $lastId;
    } elseif ($lastId < 100) {
        $id = "0" . $lastId;
    } else {
        $id = $lastId;
    }

    $formattedProductId =  "Prod" . "-" . $id;
}



//check to see if search keyword in query string is not empty and less than 50 chars
checkKeyword($formattedProductId);


$product->product_number = $formattedProductId;

// create
$query = checkCreate($product);

returnSuccess($product, "product", $query);
