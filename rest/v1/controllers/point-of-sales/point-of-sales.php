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

    // update point of sales order
    // get should not be present
    if (array_key_exists("orderid", $_GET)) {

        // get ordersid from query string
        $pos->orders_aid = $_GET['orderid'];
        $pos->orders_product_quantity = checkIndex($data, "orders_product_quantity");
        $pos->orders_product_amount = checkIndex($data, "orders_product_amount");
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

    // create point of sales order
    if (empty($_GET)) {
        // create orders id format ex. (order-001) 
        $formattedOrderId = "";
        $id = "";
        $orderLastId = $pos->readLastOrderId();
        if ($orderLastId->rowCount() == 0) {
            // create new id
            $formattedOrderId = "ord" . "-" . "001";
        } else {

            $row = $orderLastId->fetch(PDO::FETCH_ASSOC);
            extract($row);
            // order_id from existing record ex. (order-001)
            $existingOrderId = explode("-", $orders_number);

            $lastId =  intval($existingOrderId[1]) + 1;
            if ($lastId < 10) {
                $id = "00" . $lastId;
            } elseif ($lastId < 100) {
                $id = "0" . $lastId;
            } else {
                $id = $lastId;
            }

            $formattedOrderId =  "ord" . "-" . $id;
        }

        // create orders id format ex. (order-001) 
        $formattedSalesId = "";
        $salesId = "";
        $salesLastId = $pos->readLastSalesId();
        if ($salesLastId->rowCount() == 0) {
            // create new id
            $formattedSalesId = "sls" . "-" . "001";
        } else {

            $row = $salesLastId->fetch(PDO::FETCH_ASSOC);
            extract($row);
            // order_id from existing record ex. (order-001)
            $existingSalesId = explode("-", $sales_number);

            $lastId =  intval($existingSalesId[1]) + 1;
            if ($lastId < 10) {
                $salesId = "00" . $lastId;
            } elseif ($lastId < 100) {
                $salesId = "0" . $lastId;
            } else {
                $salesId = $lastId;
            }

            $formattedSalesId =  "sls" . "-" . $salesId;
        }

        //check to see if search keyword in query string is not empty and less than 50 chars
        checkKeyword($formattedOrderId);
        checkKeyword($formattedSalesId);

        $pos->orders_number = $formattedOrderId;
        $pos->sales_number = $formattedSalesId;
        $pos->orders_member_id = checkIndex($data, "orders_member_id");
        $pos->orders_product_quantity = checkIndex($data, "orders_product_quantity");
        $pos->orders_product_amount = checkIndex($data, "orders_product_amount");
        $pos->orders_date = checkIndex($data, "orders_date");
        $pos->orders_is_paid = checkIndex($data, "orders_is_paid");
        $pos->orders_is_draft = checkIndex($data, "orders_is_draft");
        $pos->orders_remarks = $data["orders_remarks"];
        $pos->sales_discount = checkIndex($data, "sales_discount");
        $pos->sales_receive_amount = "";
        $pos->sales_or = "";
        $pos->sales_member_change = "";
        $pos->sales_date = "";
        $pos->orders_created = date("Y-m-d H:i:s");
        $pos->orders_datetime = date("Y-m-d H:i:s");

        $allItem = $data["items"];

        if (count($allItem) === 0) {
            resultError("Please check if you have product.");
        }
        if (count($allItem) > 0) {
            $pos->orders_product_id = checkIndex($allItem, "suppliers_products_aid");
            $pos->orders_product_srp = checkIndex($allItem, "suppliers_products_scc_price");
            $pos->orders_suplier_price = checkIndex($allItem, "suppliers_products_price");
        }
        // create
        $query = checkCreate($pos);
        checkCreateSales($pos);

        returnSuccess($pos, "point of sales", $query);
    }
}
http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
