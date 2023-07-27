<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$stocks = new Stocks($conn);
// get $_GET data
// check if stockid is in the url e.g. /stockid/1
$error = [];
$returnData = [];
if (array_key_exists("stockid", $_GET)) {
    // check data
    checkPayload($data);
    // get stockid from query string

    $stocks->stocks_aid = $_GET['stockid'];
    $stocks->stocks_barcode_id = checkIndex($data, "stocks_barcode_id");
    $stocks->stocks_product_id = checkIndex($data, "stocks_product_id");
    $stocks->stocks_quantity = checkIndex($data, "stocks_quantity");
    $stocks->stocks_remarks = checkIndex($data, "stocks_remarks");
    $stocks->stocks_date = checkIndex($data, "stocks_date");
    $stocks->stocks_created = date("Y-m-d H:i:s");
    $stocks->stocks_datetime = date("Y-m-d H:i:s");

    $stocks_barcode_id_old = $data["stocks_barcode_id_old"];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($stocks->stocks_aid);
    if ($stocks_barcode_id_old === "") {
        isBarcodeExist($stocks, $stocks->stocks_barcode_id);
        $stocks->lastInsertedId = $stocks->stocks_aid;
        checkCreateBarcode($stocks);
        $query = checkUpdate($stocks);
        returnSuccess($stocks, "stocks", $query);
    }

    compareBarcode($stocks, $stocks_barcode_id_old, $stocks->stocks_barcode_id);
    checkUpdateBarcode($stocks);
    $query = checkUpdate($stocks);
    returnSuccess($stocks, "stocks", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
