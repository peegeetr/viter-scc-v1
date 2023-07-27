<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/account/details/Patronage.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$patronage = new Patronage($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET) && array_key_exists("membersId", $_GET)) {
        // get data
        // get task id from query string
        $patronage->orders_member_id = $_GET['membersId'];
        $patronage->orders_start = $_GET['start'];
        $patronage->orders_total = 20;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($patronage->orders_start, $patronage->orders_total);
        $query = checkReadLimitById($patronage);
        $total_result = checkReadById($patronage);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $patronage->orders_total;
        $returnData["page"] = (int)$patronage->orders_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $patronage->orders_total);
        $returnData["success"] = true;
        $response->setData($returnData);
        $response->send();
        exit;
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
