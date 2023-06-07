<?php

// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// use needed classes
require '../../models/dashboard/Dashboard.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$announcement = new Announcement($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $announcement->announcement_start = $_GET['start'];
        $announcement->announcement_total = 20;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($announcement->announcement_start, $announcement->announcement_total);
        $query = checkReadLimit($announcement);
        $total_result = checkReadAll($announcement);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $announcement->announcement_total;
        $returnData["page"] = (int)$announcement->announcement_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $announcement->announcement_total);
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
