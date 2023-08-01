<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/inventory/report/ReportStocks.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$stocks = new ReportStocks($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    $stocks->start_date = date("Y-m-d");
    $stocks->end_date = date("Y-m-d");
    $query = checkReadReportStocksFilterAll($stocks);
    http_response_code(200);
    getQueriedData($query);
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();