<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php'; 
// use needed classes
require '../../../../models/account/details/Savings.php'; 
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$savings = new Savings($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET) && array_key_exists("membersid", $_GET)) {
        // get data
        // get task id from query string
        $savings->savings_member_id = $_GET['membersid'];
        $savings->savings_start = $_GET['start'];
        $savings->total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($savings->savings_start, $savings->total);
        $query = checkReadLimitById($savings);
        $total_result = checkReadById($savings);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $savings->total;
        $returnData["page"] = (int)$savings->savings_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $savings->total);
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
