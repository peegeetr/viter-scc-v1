<?php
// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../../models/account/details/capital-share/Amortization.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$amortization = new Amortization($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET) && array_key_exists("membersid", $_GET)) {
        // get data
        // get task id from query string
        $amortization->capital_amortization_member_id = $_GET['membersid'];
        $amortization->capital_amortization_start = $_GET['start'];
        $amortization->capital_amortization_total = 20;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($amortization->capital_amortization_start, $amortization->capital_amortization_total);
        $query = checkReadLimitById($amortization);
        $total_result = checkReadById($amortization);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $amortization->capital_amortization_total;
        $returnData["page"] = (int)$amortization->capital_amortization_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $amortization->capital_amortization_total);
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
