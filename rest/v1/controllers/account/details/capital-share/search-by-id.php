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
// get data
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("membersid", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $share->capital_share_member_id = $_GET['membersid'];
        $share->capital_search = checkIndex($data, "search");
        //check to see if search keyword in query string is not empty and less than 50 chars
        checkKeyword($share->capital_search);
        $query = checkSearchById($share);
        http_response_code(200);
        getQueriedData($query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
