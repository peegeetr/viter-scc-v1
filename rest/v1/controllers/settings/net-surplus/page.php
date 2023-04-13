<?php

// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/settings/net-surplus/NetSurplus.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$net = new NetSurplus($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $net->net_surplus_start = $_GET['start'];
        $net->net_surplus_total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($net->net_surplus_start, $net->net_surplus_total);
        $query = checkReadLimit($net);
        $total_result = checkReadAll($net);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $net->net_surplus_total;
        $returnData["page"] = (int)$net->net_surplus_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $net->net_surplus_total);
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