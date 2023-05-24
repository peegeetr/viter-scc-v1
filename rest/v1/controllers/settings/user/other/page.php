<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/user/other/UserOther.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$user_other = new UserOther($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $user_other->user_other_start = $_GET['start'];
        $user_other->user_other_total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($user_other->user_other_start, $user_other->user_other_total);
        $query = checkReadLimit($user_other);
        $total_result = checkReadAll($user_other);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $user_other->user_other_total;
        $returnData["page"] = (int)$user_other->user_other_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $user_other->user_other_total);
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
