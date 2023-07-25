<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/inventory/report/ReportCapitalShare.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$capital = new ReportCapitalShare($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();


    // if request is a GET e.g. /capital year
    if (array_key_exists("year", $_GET)) {
        $capital->capital_share_date = $_GET['year'];

        checkId($capital->capital_share_date);
        // get task id from query string 
        $query = checkReadMemberAllTotal($capital);
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
