<?php

// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// use needed classes
require '../../models/point-of-sales/PointOfSales.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$pos = new PointOfSales($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("membersid", $_GET)) {
        // get data
        // get task id from query string
        $pos->orders_member_id = $_GET['membersid'];
        checkId($pos->orders_member_id);
        $query = checkReadById($pos);
        http_response_code(200);
        getQueriedData($query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();