<?php
// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../../models/inventory/report/net-surplus-distribution/ReportPatronage.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$report_patronage = new ReportPatronage($conn);
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

    if (array_key_exists("year", $_GET)) {
        $report_patronage->orders_date = $_GET['year'];
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($report_patronage->orders_date);
        $query = checkReadReportPatronageByYear($report_patronage);
        http_response_code(200);
        getQueriedData($query);
    }

    if (empty($_GET)) {
        // get task id from query string 
        $report_patronage->orders_member_id = checkIndex($allValues, "member_id");
        $report_patronage->orders_date = checkIndex($allValues, "year");

        if (
            $report_patronage->orders_member_id !== "0"
        ) {
            $query = checkReadReportPatronageByYearAndMemberId($report_patronage);
            http_response_code(200);
            getQueriedData($query);
        }

        $query = checkReadReportPatronageByYear($report_patronage);
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
