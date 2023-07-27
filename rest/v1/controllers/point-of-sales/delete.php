<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$pos = new PointOfSales($conn);
$response = new Response();
$error = [];
$returnData = [];
if (array_key_exists("orderId", $_GET)) {
    $pos->orders_aid = $_GET['orderId'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($pos->orders_aid);

    // delete
    $query = checkDelete($pos);
    returnSuccess($pos, "pos", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
