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

    if (array_key_exists("start", $_GET) && array_key_exists("membersid", $_GET)) {
        // get data
        // get task id from query string
        $patronage->patronage_member_id = $_GET['membersid'];
        $patronage->patronage_start = $_GET['start'];
        $patronage->total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($patronage->patronage_start, $patronage->total);
        $query = checkReadLimitById($patronage);
        $total_result = checkReadById($patronage);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $patronage->total;
        $returnData["page"] = (int)$patronage->patronage_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $patronage->total);
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
