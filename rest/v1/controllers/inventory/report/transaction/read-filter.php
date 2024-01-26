<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/inventory/report/transaction/ReportTransaction.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$transaction = new ReportTransaction($conn);
$response = new Response();
// get data
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);
    // get task id from query string  
    $transaction->date_start = $data["dateFrom"];
    $transaction->date_end = $data["dateTo"];
    $transaction->month = checkIndex($data, "month");
    $transaction->year = $data["year"];

    // filter date
    if (
        $transaction->month === "other-date"
    ) {
        // check if not empty 

        $query = checkReadReportOrderByDate($transaction);
        http_response_code(200);
        getQueriedData($query);
    }

    // filter year with months
    if (
        $transaction->month !== "all" &&
        $transaction->year !== "all"
    ) {

        $query = checkReadReportOrderByYear($transaction);
        http_response_code(200);
        getQueriedData($query);
    }
    // filter year with months
    if (
        $transaction->month === "all" &&
        $transaction->year !== "all"
    ) {

        $query = checkReadReportOrderByAllYear($transaction);
        http_response_code(200);
        getQueriedData($query);
    }
    // filter year with months
    if (
        $transaction->month !== "all" &&
        $transaction->year === "all"
    ) {
        // default filter month with all year
        $query = checkReadReportOrderByMonth($transaction);
        http_response_code(200);
        getQueriedData($query);
    }

    // default filter month with all year
    $query = checkReadAllOrderByDate($transaction);
    http_response_code(200);
    getQueriedData($query);
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
