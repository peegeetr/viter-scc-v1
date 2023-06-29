<?php

// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/settings/subscribe-capital/SubscribeCapital.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$subscribe_capital = new SubscribeCapital($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $subscribe_capital->subscribe_capital_start = $_GET['start'];
        $subscribe_capital->subscribe_capital_total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($subscribe_capital->subscribe_capital_start, $subscribe_capital->subscribe_capital_total);
        $query = checkReadLimit($subscribe_capital);
        $total_result = checkReadAll($subscribe_capital);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $subscribe_capital->subscribe_capital_total;
        $returnData["page"] = (int)$subscribe_capital->subscribe_capital_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $subscribe_capital->subscribe_capital_total);
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
