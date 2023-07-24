<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/account/details/Dividend.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$dividend = new Dividend($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET) && array_key_exists("membersId", $_GET)) {
        // get data
        // get task id from query string
        $dividend->capital_share_member_id = $_GET['membersId'];
        $dividend->capital_start = $_GET['start'];
        $dividend->capital_total = 20;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($dividend->capital_start, $dividend->capital_total);
        $query = checkReadLimitById($dividend);
        $total_result = checkReadById($dividend);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $dividend->capital_total;
        $returnData["page"] = (int)$dividend->capital_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $dividend->capital_total);
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
