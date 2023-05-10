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

    if (array_key_exists("membersid", $_GET)) {
        // get task id from query string
        $members->members_aid = $_GET['membersid'];
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($members->members_aid);
        $query = checkReadNameById($members);
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
