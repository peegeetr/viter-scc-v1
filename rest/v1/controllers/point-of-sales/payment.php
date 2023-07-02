<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/point-of-sales/PointOfSales.php';
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$pos = new PointOfSales($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);

    // get should not be present
    if (array_key_exists("orderid", $_GET)) {
        // return 404 error if endpoint not available
        checkEndpoint();
    }

    // create point of sales order
    if (empty($_GET)) {
        $pos->sales_or = checkIndex($data, "sales_or");
        $pos->sales_member_change = 0;
        $pos->orders_is_paid = 1;
        $pos->sales_date = date("Y-m-d H:i:s");
        $pos->orders_datetime = date("Y-m-d H:i:s");

        $allOrders = $data["result"];

        if (count($allOrders) === 0) {
            $error = [];
            $response->setSuccess(false);
            $error['error'] = "NO DATA";
            $error["success"] = false;
            $response->setData($error);
            $response->send();
            exit;
        }

        if (count($allOrders) > 0) {
            for ($d = 0; $d < count($allOrders); $d++) {
                $pos->orders_aid = $allOrders[$d]["orders_aid"];
                $pos->sales_receive_amount = (int)$allOrders[$d]["orders_product_amount"] - (int)$allOrders[$d]["sales_discount"];
                $query = checkSalesPaymentUpdate($pos);
                checkIsPaidOrder($pos);
            }
        }
        returnSuccess($pos, "point of sales", $query);
    }
}
http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
