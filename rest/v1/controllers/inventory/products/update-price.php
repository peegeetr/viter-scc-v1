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
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);

    if (array_key_exists("supplierProductsId", $_GET)) {
        // get data
        $suppliersProducts->suppliers_products_aid = $_GET['supplierProductsId'];
        $suppliersProducts->suppliers_products_scc_price = checkIndex($data, "suppliers_products_scc_price");
        $suppliersProducts->suppliers_products_retail_price = checkIndex($data, "suppliers_products_retail_price");
        $suppliersProducts->suppliers_products_datetime = date("Y-m-d H:i:s");

        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($suppliersProducts->suppliers_products_aid);
        // update
        $query = checkUpdateSccPrice($suppliersProducts);
        returnSuccess($suppliersProducts, "Suppliers Products", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
