<?php
// check database connection
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

//check to see if search keyword in query string is not empty and less than 50 chars
checkKeyword($formattedOrderId);

$order->orders_number = $formattedOrderId;
$order->orders_member_id = checkIndex($data, "orders_member_id");
$order->orders_product_id = checkIndex($data, "orders_product_id");
$order->orders_product_quantity = checkIndex($data, "orders_product_quantity");
$order->orders_product_amount = checkIndex($data, "orders_product_amount");
$order->orders_date = checkIndex($data, "orders_date");
$order->orders_or = checkIndex($data, "orders_or");
$order->orders_is_paid = 0;
$order->orders_created = date("Y-m-d H:i:s");
$order->orders_datetime = date("Y-m-d H:i:s");

// create 
$query = checkCreate($order);

returnSuccess($order, "order", $query);
