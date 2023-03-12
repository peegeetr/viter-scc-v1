<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php'; 
// use needed classes
require '../../../../models/account/details/Savings.php';  
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$savings = new Savings($conn);
$response = new Response();
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("search", $_GET) && array_key_exists("membersid", $_GET)) {
        // get data
        // get task id from query string
        $savings->savings_member_id = $_GET['membersid'];
        $savings->savings_search = $_GET['search'];
        //check to see if search keyword in query string is not empty and less than 50 chars
        checkKeyword($savings->savings_search);
        $query = checkSearch($savings);
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
