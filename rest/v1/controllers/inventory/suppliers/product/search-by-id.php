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
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("supplierid", $_GET) && array_key_exists("search", $_GET)) {
        // get task id from query string
        $suppliersProducts->suppliers_products_suppliers_id = $_GET['supplierid'];
        $suppliersProducts->suppliers_products_search = $_GET['search'];
        //check to see if search keyword in query string is not empty and less than 50 chars
        checkId($suppliersProducts->suppliers_products_suppliers_id);
        checkKeyword($suppliersProducts->suppliers_products_search);
        $query = checkSearchById($suppliersProducts);
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