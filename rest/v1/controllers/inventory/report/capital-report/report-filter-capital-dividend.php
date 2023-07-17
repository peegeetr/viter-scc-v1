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
// get data
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);

    // get value
    $allValues = $data['value'];

    // get task id from query string 
    $capital->capital_share_member_id = checkIndex($allValues, "member_id");
    $capital->capital_share_date = checkIndex($allValues, "year");

    if (
        $capital->capital_share_member_id !== "0"
    ) {
        $query = checkReadReportCapitalDividendByMemberId($capital);
        http_response_code(200);
        getQueriedData($query);
    }

    $query = checkReadReportCapitalDividend($capital);
    http_response_code(200);
    getQueriedData($query);
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
