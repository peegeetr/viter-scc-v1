<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$stocks = new Stocks($conn);
// get should not be present
if (array_key_exists("stockid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$stocks->stocks_product_id = checkIndex($data, "stocks_product_id");
$stocks->stocks_quantity = checkIndex($data, "stocks_quantity");
$stocks->stocks_date = checkIndex($data, "stocks_date");
$stocks->stocks_suplier_price = checkIndex($data, "stocks_suplier_price");
$stocks->stocks_is_pending = 1;
$stocks->stocks_created = date("Y-m-d H:i:s");
$stocks->stocks_datetime = date("Y-m-d H:i:s");

// create Stc id format ex. (Stc-001) 
$formattedStockId = "";
$id = "";
$stocksLastId = $stocks->readLastStockId();
if ($stocksLastId->rowCount() == 0) {
    // create new id
    $formattedStockId = "stc" . "-" . "001";
} else {

    $row = $stocksLastId->fetch(PDO::FETCH_ASSOC);
    extract($row);
    // product_id from existing record ex. (Prod-001)
    $existingMeberId = explode("-", $stocks_number);

    $lastId =  intval($existingMeberId[1]) + 1;
    if ($lastId < 10) {
        $id = "00" . $lastId;
    } elseif ($lastId < 100) {
        $id = "0" . $lastId;
    } else {
        $id = $lastId;
    }

    $formattedStockId =  "stc" . "-" . $id;
}



//check to see if search keyword in query string is not empty and less than 50 chars
checkKeyword($formattedStockId);


$stocks->stocks_number = $formattedStockId;

// create
$query = checkCreate($stocks);

returnSuccess($stocks, "Stocks", $query);
