<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$price_markup = new PriceMarkup($conn);
// get should not be present
if (array_key_exists("roleid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$price_markup->price_markup_retail = checkIndex($data, "price_markup_retail");
$price_markup->price_markup_member = checkIndex($data, "price_markup_member");
$price_markup->price_markup_retail_whole_sale = checkIndex($data, "price_markup_retail_whole_sale");
$price_markup->price_markup_member_whole_sale = checkIndex($data, "price_markup_member_whole_sale");
$price_markup->price_markup_is_active = 1;
$price_markup->price_markup_created_at = date("Y-m-d H:i:s");
$price_markup->price_markup_updated_at = date("Y-m-d H:i:s");

// // check name
isActiveExist($price_markup, $price_markup->price_markup_is_active);
// create
$query = checkCreate($price_markup);

returnSuccess($price_markup, "price markup", $query);
