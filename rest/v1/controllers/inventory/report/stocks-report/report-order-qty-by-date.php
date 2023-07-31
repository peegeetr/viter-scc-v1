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
// // get data
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("isFilter", $_GET)) {
        $filter = $_GET['isFilter'];

        if ($filter === "true") {
            // check data
            checkPayload($data);
            // get value
            $allValues = $data['value'];
            $stocks->start_date = checkIndex($allValues, "date_from");
            $stocks->end_date = checkIndex($allValues, "date_to");
            $query = checkReadAllStockGroupByProductNumber($stocks);
            http_response_code(200);
            getQueriedData($query);
        }

        $stocks->start_date = date("Y-m-d");
        $stocks->end_date = date("Y-m-d");
        $query = checkReadAllStockGroupByProductNumber($stocks);
        http_response_code(200);
        getQueriedData($query);
    }
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
