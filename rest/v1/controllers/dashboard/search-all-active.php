<?php

// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/dashboard/Dashboard.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$announcement = new Announcement($conn);
$response = new Response();
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("search", $_GET)) {
        // get data
        // get task id from query string
        $announcement->announcement_search = $_GET['search'];
        //check to see if search keyword in query string is not empty and less than 50 chars
        checkKeyword($announcement->announcement_search);
        $query = checkSearchAllActive($announcement);
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
