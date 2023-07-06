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
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $suppliersProducts->suppliers_products_start = $_GET['start'];
        $suppliersProducts->suppliers_products_total = 20;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($suppliersProducts->suppliers_products_start, $suppliersProducts->suppliers_products_total);
        $query = checkReadLimit($suppliersProducts);
        $total_result = checkReadAll($suppliersProducts);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $suppliersProducts->suppliers_products_total;
        $returnData["page"] = (int)$suppliersProducts->suppliers_products_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $suppliersProducts->suppliers_products_total);
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
