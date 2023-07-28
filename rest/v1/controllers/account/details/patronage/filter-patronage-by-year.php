<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/account/details/Patronage.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$patronage = new Patronage($conn);
$response = new Response();
// get data
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);

    // if request is a GET e.g. /dividend
    if (array_key_exists("membersId", $_GET)) {
        $patronage->orders_member_id = $_GET['membersId'];
        $patronage->orders_date = checkIndex($data, "year");
        // get task id from query string 
        $query = checkReadFilterPatronageByMemberAndYear($patronage);
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
