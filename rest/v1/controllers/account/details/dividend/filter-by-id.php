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
// get data
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);
    if (array_key_exists("membersId", $_GET)) {
        // get task id from query string
        $dividend->capital_share_member_id = $_GET['membersId'];
        $dividend->capital_share_date = checkIndex($data, "year");
        //check to see if search keyword in query string is not empty and less than 50 chars

        checkId($dividend->capital_share_member_id);
        $query = checkFilterById($dividend);
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
