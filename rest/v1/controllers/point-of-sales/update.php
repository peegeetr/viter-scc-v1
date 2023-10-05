<?php
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

    // update point of sales order
    // get should not be present
    if (array_key_exists("orderid", $_GET)) {

        // get ordersid from query string
        $pos->orders_aid = $_GET['orderid'];
        $pos->orders_product_quantity = checkIndex($data, "orders_product_quantity");
        $pos->orders_is_discounted = $data["orders_is_discounted"];
        $pos->orders_product_amount = checkIndex($data, "orders_product_amount");
        $pos->orders_product_srp = checkIndex($data, "orders_product_srp");
        $pos->orders_remarks = $data["orders_remarks"];
        $pos->sales_discount = checkIndex($data, "sales_discount");
        $pos->orders_is_paid = 0;
        $pos->orders_datetime = date("Y-m-d H:i:s");


        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($pos->orders_aid);
        // update 
        checkUpdateSales($pos);
        $query = checkUpdate($pos);
        returnSuccess($pos, "point of sales", $query);
    }
}
http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
