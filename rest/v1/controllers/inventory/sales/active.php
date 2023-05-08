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
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if stocksid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("salesid", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string 
        $sales->sales_aid = $_GET['salesid'];
        $sales->sales_order_id = trim($data["sales_order_id"]);
        $sales->sales_is_paid = 0;
        $sales->sales_datetime = date("Y-m-d H:i:s");
        //check to see if task id in query string is not empty and is number, if not return json error 
        checkId($sales->sales_order_id);

        checkIsPaidOrder($sales);
        $query = checkActive($sales);
        http_response_code(200);
        returnSuccess($sales, "Sales", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
