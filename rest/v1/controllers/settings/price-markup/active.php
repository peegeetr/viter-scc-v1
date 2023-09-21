<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/settings/price-markup/PriceMarkup.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$price_markup = new PriceMarkup($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if roleid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("priceMarkupId", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $price_markup->price_markup_aid = $_GET['priceMarkupId'];
        $price_markup->price_markup_is_active = checkIndex($data, "isActive");
        $price_markup->price_markup_updated_at = date("Y-m-d H:i:s");
        //check to see if task id in query string is not empty and is number, if not return json error

        // // check active
        if ($price_markup->price_markup_is_active === '1') {
            isActiveExist($price_markup, $price_markup->price_markup_is_active);
        }
        checkId($price_markup->price_markup_aid);

        $query = checkActive($price_markup);
        http_response_code(200);

        returnSuccess($price_markup, "Price Markup", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
