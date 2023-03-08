<?php

// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/settings/network/Network.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$network = new Network($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $network->network_start = $_GET['start'];
        $network->network_total = 5;
        // $network->network_total = $_GET['total'];
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($network->network_start, $network->network_total);
        $query = checkReadLimit($network);
        $total_result = checkReadAll($network);
        http_response_code(200);
        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $network->network_total;
        $returnData["page"] = (int)$network->network_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $network->network_total);
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
