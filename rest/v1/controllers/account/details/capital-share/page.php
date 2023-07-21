<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/account/details/capital-share/CapitalShare.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$share = new CapitalShare($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET) && array_key_exists("membersid", $_GET)) {
        // get data
        // get task id from query string
        $share->capital_share_member_id = $_GET['membersid'];
        $share->capital_start = $_GET['start'];
        $share->capital_total = 20;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($share->capital_start, $share->capital_total);
        $query = checkReadLimitById($share);
        $total_result = checkReadById($share);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $share->capital_total;
        $returnData["page"] = (int)$share->capital_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $share->capital_total);
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
