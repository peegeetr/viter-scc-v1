<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$pos = new PointOfSales($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
$error = [];
$returnData = [];
if (empty($_GET)) {
    checkPayload($data);
    // get task id from query string
    $pos->orders_aid = checkIndex($data, "orderId");
    // delete
    $query = checkDelete($pos);
    returnSuccess($pos, "pos", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
