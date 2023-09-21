<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$price_markup = new PriceMarkup($conn);
// get $_GET data
// check if priceMarkupId is in the url e.g. /role/1
$error = [];
$returnData = [];
if (array_key_exists("priceMarkupId", $_GET)) {
    // get task id from query string
    $price_markup->price_markup_aid = $_GET['priceMarkupId'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($price_markup->price_markup_aid);
    $query = checkReadById($price_markup);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /role
if (empty($_GET)) {
    $query = checkReadAll($price_markup);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
