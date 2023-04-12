<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$patronage = new Patronage($conn);
// get $_GET data
// check if patronageid is in the url e.g. /patronageid/1
$error = [];
$returnData = [];
if (array_key_exists("patronageid", $_GET)) {
    // check data
    checkPayload($data);
    // get patronageid from query string
    $patronage->patronage_aid = $_GET['patronageid'];
    $patronage->patronage_product_id = checkIndex($data, "patronage_product_id");
    $patronage->patronage_product_quantity = checkIndex($data, "patronage_product_quantity");
    $patronage->patronage_product_amount = checkIndex($data, "patronage_product_amount");
    $patronage->patronage_date = checkIndex($data, "patronage_date");
    $patronage->patronage_or = checkIndex($data, "patronage_or");
    $patronage->patronage_datetime = date("Y-m-d H:i:s");

    $patronage->sold_product = checkIndex($data, "soldProduct");
    $patronage->remaining_quantity = checkIndex($data, "remainingQuantity");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($patronage->patronage_aid);
    // update product
    checkUpdateQunatity($patronage);
    // update 
    $query = checkUpdate($patronage);
    returnSuccess($patronage, "patronage", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
