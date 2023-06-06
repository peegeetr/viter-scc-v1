<?php

// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/inventory/sales/Sales.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$sales = new Sales($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("month", $_GET)) {
        // get data
        // get task id from query string 
        $sales->sales_month = $_GET['month'];
        $sales->sales_year = date("Y");

        //check to see if task id in query string is not empty and is number, if not return json error 
        $query = checkReadAllPendingPaidByMonth($sales);
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
