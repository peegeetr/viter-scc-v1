<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/inventory/suppliers/product/SuppliersProducts.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$suppliersProducts = new SuppliersProducts($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("supplierId", $_GET) && array_key_exists("categoryId", $_GET)) {
        // get task id from query string
        $suppliersProducts->suppliers_products_suppliers_id = $_GET['supplierId'];
        $suppliersProducts->suppliers_products_category_id = $_GET['categoryId'];
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($suppliersProducts->suppliers_products_suppliers_id);
        checkId($suppliersProducts->suppliers_products_category_id);
        $query = checkReadSupplierCategoryBySupplierId($suppliersProducts);
        http_response_code(200);
        getQueriedData($query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
