<?php
// check database connection
require 'functions.php';
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$order = new Orders($conn);
// get should not be present
if (array_key_exists("orderid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

// create orders id format ex. (order-001) 
$formattedOrderId = "";
$id = "";
$orderLastId = $order->readLastOrderId();
if ($orderLastId->rowCount() == 0) {
    // create new id
    $formattedOrderId = "order" . "-" . "001";
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

    $formattedOrderId =  "order" . "-" . $id;
}

// create orders id format ex. (order-001) 
$formattedSalesId = "";
$salesId = "";
$salesLastId = $order->readLastSalesId();
if ($salesLastId->rowCount() == 0) {
    // create new id
    $formattedSalesId = "sales" . "-" . "001";
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

    $formattedSalesId =  "sales" . "-" . $salesId;
}

//check to see if search keyword in query string is not empty and less than 50 chars
checkKeyword($formattedOrderId);
checkKeyword($formattedSalesId);

$order->orders_number = $formattedOrderId;
$order->sales_number = $formattedSalesId;
$order->orders_member_id = checkIndex($data, "orders_member_id");
$order->orders_product_id = checkIndex($data, "orders_product_id");
$order->orders_product_quantity = checkIndex($data, "orders_product_quantity");
$order->orders_product_amount = checkIndex($data, "orders_product_amount");
$order->orders_date = checkIndex($data, "orders_date");
$order->orders_is_paid = 0;
$order->orders_created = date("Y-m-d H:i:s");
$order->orders_datetime = date("Y-m-d H:i:s");

// create
$query = checkCreate($order);
checkCreateSales($order);

returnSuccess($order, "order", $query);