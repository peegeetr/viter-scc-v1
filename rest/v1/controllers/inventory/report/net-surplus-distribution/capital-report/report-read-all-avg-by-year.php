<?php
// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../../models/inventory/report/net-surplus-distribution/ReportCapitalShare.php';
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

    if (array_key_exists("memberId", $_GET) && array_key_exists("year", $_GET)) {
        $capital->capital_share_member_id = $_GET['memberId'];
        $capital->capital_share_date = $_GET['year'];

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
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
