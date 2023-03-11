<?php

// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php'; 
require 'functions.php'; 
// use needed classes
require '../../models/account/Members.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$members = new Members($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
  
    if (array_key_exists("start", $_GET) && array_key_exists("approved", $_GET)) {
        // get data
        // get task id from query string
        $members->members_start = $_GET['start']; 
        $members->members_total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($members->members_start, $members->members_total);
        $query = checkReadLimitApproved($members);
        $total_result = checkReadAllApproved($members);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $members->members_total;
        $returnData["page"] = (int)$members->members_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $members->members_total);
        $returnData["success"] = true;
        $response->setData($returnData);
        $response->send();
        exit;
    }
    
    
    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $members->members_start = $_GET['start'];
        $members->members_total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($members->members_start, $members->members_total);
        $query = checkReadLimit($members);
        $total_result = checkReadAll($members);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $members->members_total;
        $returnData["page"] = (int)$members->members_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $members->members_total);
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
