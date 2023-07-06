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
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);
    // get task id from query string 
    $announcement->announcement_search = checkIndex($data, "search");
    //check to see if search keyword in query string is not empty and less than 50 chars
    checkKeyword($announcement->announcement_search);
    $query = checkSearch($announcement);
    http_response_code(200);
    getQueriedData($query);
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
