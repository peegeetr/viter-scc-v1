<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$price_markup = new PriceMarkup($conn);
// get $_GET data
// check if priceMarkupId is in the url e.g. /priceMarkupId/1
$error = [];
$returnData = [];
if (array_key_exists("priceMarkupId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    // get priceMarkupId from query string
    $price_markup->price_markup_aid = $_GET['priceMarkupId'];
    $price_markup->price_markup_retail = checkIndex($data, "price_markup_retail");
    $price_markup->price_markup_member = checkIndex($data, "price_markup_member");
    $price_markup->price_markup_whole_sale = checkIndex($data, "price_markup_whole_sale");
    $price_markup->price_markup_updated_at = date("Y-m-d H:i:s");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($price_markup->price_markup_aid);
    // update
    $query = checkUpdate($price_markup);
    // update column name  
    returnSuccess($price_markup, "Price Markup", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
