<?php
// check database connection 
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$sales = new Sales($conn);
// get should not be present
if (array_key_exists("salesid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data


// create orders id format ex. (sales-001) 
$formattedSalesId = "";
$id = "";
$salesLastId = $sales->readLastSalesId();
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
        $id = "00" . $lastId;
    } elseif ($lastId < 100) {
        $id = "0" . $lastId;
    } else {
        $id = $lastId;
    }

    $formattedSalesId =  "sales" . "-" . $id;
}

//check to see if search keyword in query string is not empty and less than 50 chars
checkKeyword($formattedSalesId);

$sales->sales_number = $formattedSalesId;
$sales->sales_member_id = checkIndex($data, "sales_member_id");
$sales->sales_order_id = checkIndex($data, "sales_order_id");
$sales->sales_receive_amount = checkIndex($data, "sales_receive_amount");
$sales->sales_date = checkIndex($data, "sales_date");
$sales->sales_is_paid = 0;
$sales->sales_created = date("Y-m-d H:i:s");
$sales->sales_datetime = date("Y-m-d H:i:s");

// create  
$query = checkCreate($sales);

returnSuccess($sales, "sales", $query);
