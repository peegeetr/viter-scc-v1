<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/inventory/suppliers/product/SuppliersProducts.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$suppliersProducts = new SuppliersProducts($conn);
$response = new Response();
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (empty($_GET)) {
        // get data 
        $data = [];
        $orderQuantity = 0;
        $totalQty = 0;
        $orders_product_id = 0;
        $orderProductCount = 0;
        $stockQuantity = 0;
        $stocks_product_id = 0;
        $stockProductCount = 0;

        $stockProduct = $suppliersProducts->readAllStockGroupByProductId();

        if ($stockProduct->rowCount() > 0) {
            $stockRow = $stockProduct->fetchAll();
            extract($stockRow);


            for ($s = 0; $s < count($stockRow); $s++) {
                $stockQuantity = $stockRow[$s]["stockQuantity"];
                $stocks_product_id = $stockRow[$s]["stocks_product_id"];
                $stockProductCount = $stockRow[$s]["count"];

                $suppliersProducts->product_id = $stockRow[$s]["stocks_product_id"];

                $orderProduct = $suppliersProducts->readAllOrderGroupByProduct();


                // if have any order
                if ($orderProduct->rowCount() > 0) {
                    $orderRow = $orderProduct->fetchAll();
                    extract($orderRow);

                    for ($o = 0; $o < count($orderRow); $o++) {
                        
                        $stockQuantity = $stockRow[$s]["stockQuantity"];
                        $stocks_product_id = $stockRow[$s]["stocks_product_id"];
                        $stockProductCount = $stockRow[$s]["count"];
                        $orderQuantity = $orderRow[$o]["orderQuantity"];
                        $orders_product_id = $orderRow[$o]["orders_product_id"];
                        $orderProductCount = $orderRow[$o]["count"];

                        // if stock and order have same product ID
                        // get total quantity
                        if ($stocks_product_id == $orders_product_id) {
                            $totalQty = $stockQuantity - $orderQuantity;
                            $data[] =  array(
                                "orders_product_id" => $orders_product_id, "stocks_product_id" => $stocks_product_id,
                                "orderQuantity" => $orderQuantity, "stockQuantity" => $stockQuantity, "totalQty" => $totalQty,
                                "orderProductCount" => $orderProductCount, "stockProductCount" => $stockProductCount
                            );

                            array_push($data);
                        }
                    }
                }

                // if dont have any order
                if ($orderProduct->rowCount() == 0) {
                    
        $orderQuantity = 0;
                    // get total quantity 
                    $totalQty = $stockQuantity - $orderQuantity;
                    $data[] =  array(
                        "orders_product_id" => $stocks_product_id, "stocks_product_id" => $stocks_product_id,
                        "orderQuantity" => $orderQuantity, "stockQuantity" => $stockQuantity, "totalQty" => $totalQty,
                        "orderProductCount" => $orderProductCount, "stockProductCount" => $stockProductCount
                    );

                    array_push($data);
                }
            }
        }

        http_response_code(200);

        $response = new Response();
        $returnData = [];
        $returnData["data"] = $data;
        $returnData["success"] = true;
        $response->setData($returnData);
        $response->send();
        exit;
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
