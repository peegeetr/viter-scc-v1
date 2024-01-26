<?php
// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../../models/inventory/report/transaction/view/ReportTransactionView.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$transaction = new ReportTransactionView($conn);
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
    $transaction->type = $data["type"];
    $transaction->date = $data["date"];

    $newDate = explode("-", $data["date"]);
    $transaction->month = $newDate[1];
    $transaction->year = $newDate[0];

    // filter date
    if (
        $transaction->type === "month"
    ) {
        $query = checkReadSalesByMonth($transaction);
        http_response_code(200);
        getQueriedData($query);
    }

    // filter year with months
    if (
        $transaction->type === "month-year"
    ) {
        $query = checkReadSalesByMonthAndYear($transaction);
        http_response_code(200);
        getQueriedData($query);
    }
    // filter year with months
    if (
        $transaction->type === "year"
    ) {
        // default filter month with all year
        $query = checkReadSalesByYear($transaction);
        http_response_code(200);
        getQueriedData($query);
    }
    // filter year with months
    if (
        $transaction->type === "date"
    ) {
        $query = checkReadSalesByDate($transaction);
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
