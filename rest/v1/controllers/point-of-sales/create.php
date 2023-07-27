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
        $pos->orders_date = date("Y-m-d");
        $pos->orders_is_paid = 0;
        $pos->orders_is_draft = 0;
        $pos->sales_discount = "0";
        $pos->orders_product_quantity = 1;
        $pos->orders_remarks = "";
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
            $pos->orders_product_amount = checkIndex($allItem, "suppliers_products_scc_price");
            $pos->orders_stocks_id = checkIndex($allItem, "stocks_aid");
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
