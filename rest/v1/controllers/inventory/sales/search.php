<?php

// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/inventory/sales/Sales.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$sales = new Sales($conn);
$response = new Response();
// get data
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);
    if (empty($_GET)) {
        // get task id from query string 
        $sales->sales_search =  checkIndex($data, "search");
        //check to see if search keyword in query string is not empty and less than 50 chars
        checkKeyword($sales->sales_search);
        $query = checkSearch($sales);
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
