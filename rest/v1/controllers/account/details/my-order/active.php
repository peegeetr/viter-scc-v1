<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/account/details/MyOrders.php'; 
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$order = new MyOrders($conn);
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
    if (array_key_exists("orderid", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $order->orders_aid = $_GET['orderid'];
        $order->orders_is_draft = trim($data["isActive"]);
        $order->orders_datetime = date("Y-m-d H:i:s");
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($order->orders_aid);

        $query = checkActive($order);
        http_response_code(200);
        returnSuccess($order, "orders", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
