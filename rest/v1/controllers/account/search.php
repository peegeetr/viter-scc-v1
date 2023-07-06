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
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);
    // get data 
    $members->members_search = checkIndex($data, "search");
    //check to see if search keyword in query string is not empty and less than 50 chars
    checkKeyword($members->members_search);
    $query = checkSearch($members);
    http_response_code(200);
    getQueriedData($query);
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
