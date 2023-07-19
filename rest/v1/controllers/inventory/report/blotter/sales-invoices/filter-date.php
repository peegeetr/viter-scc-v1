<?php
// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
require 'functions.php';
// use needed classes 
require '../../../../../models/inventory/report/blotter/SalesInvoices.php';

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$salesInvoices = new SalesInvoices($conn);
$response = new Response();
// get data
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);
    // get value
    $allValues = $data['value'];

    if (empty($_GET)) {
        // get task id from query string 
        $salesInvoices->startDate = checkIndex($allValues, "start_date");
        $salesInvoices->endDate = checkIndex($allValues, "end_date");
        $query = checkFilterDateRange($salesInvoices);
        http_response_code(200);
        getQueriedData($query);
    }
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
