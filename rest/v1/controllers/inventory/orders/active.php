<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php'; 
// use needed classes
require '../../../models/inventory/order/Order.php'; 
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$order = new Order($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if orderid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("orderid", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $order->product_order_aid = $_GET['orderid'];
        $order->product_order_is_active = trim($data["isActive"]);
        $order->product_order_datetime = date("Y-m-d H:i:s");
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($order->product_order_aid);
 
        $query = checkActive($order);
        http_response_code(200);

        returnSuccess($order, "Order", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
