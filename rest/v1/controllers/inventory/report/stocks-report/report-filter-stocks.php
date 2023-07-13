<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/inventory/report/ReportStocks.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$stocks = new ReportStocks($conn);
$response = new Response();
// get data
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    // check data
    checkPayload($data);

    // get value
    $allValues = $data['value'];

    // get task id from query string  
    $stocks->suppliers_products_suppliers_id = checkIndex($allValues, "supplier_id");
    $stocks->suppliers_products_category_id = checkIndex($allValues, "category_id");
    $stocks->suppliers_products_aid = checkIndex($allValues, "product_id");

    // if all supplier , category by id, all product 
    // 0 = all, 1 = by item id
    // 0,1,0

    if (
        $stocks->suppliers_products_suppliers_id === "0"
        && $stocks->suppliers_products_category_id !== "0" && $stocks->suppliers_products_aid === "0"
    ) {

        $query = checkReadReportStocksFilterByCategory($stocks);
        http_response_code(200);
        getQueriedData($query);
    }

    // if supplier by id, category by id , all product 
    // 0 = all, 1 = by item id
    // 1,1,0
    if (
        $stocks->suppliers_products_suppliers_id !== "0"
        && $stocks->suppliers_products_category_id !== "0" && $stocks->suppliers_products_aid === "0"
    ) {

        $query = checkReadReportStocksFilterBySupplierCategory($stocks);
        http_response_code(200);
        getQueriedData($query);
    }

    // if supplier by id,  all category, all product 
    // 0 = all, 1 = by item id
    // 1,0,0
    if (
        $stocks->suppliers_products_suppliers_id !== "0"
        && $stocks->suppliers_products_category_id === "0" && $stocks->suppliers_products_aid === "0"
    ) {

        $query = checkReadReportStocksFilterBySupplier($stocks);
        http_response_code(200);
        getQueriedData($query);
    }

    // if supplier by id, all category, product by id  
    // 0 = all, 1 = by item id
    // 1,0,1
    if (
        $stocks->suppliers_products_suppliers_id !== "0"
        && $stocks->suppliers_products_category_id === "0" && $stocks->suppliers_products_aid !== "0"
    ) {

        $query = checkReadReportStocksFilterBySupplierProduct($stocks);
        http_response_code(200);
        getQueriedData($query);
    }

    // if all supplier, category by id, product by id  
    // 0 = all, 1 = by item id
    // 0,1,1
    if (
        $stocks->suppliers_products_suppliers_id === "0"
        && $stocks->suppliers_products_category_id !== "0" && $stocks->suppliers_products_aid !== "0"
    ) {

        $query = checkReadReportStocksFilterByCategoryProduct($stocks);
        http_response_code(200);
        getQueriedData($query);
    }

    // if supplier by id, category by id, product by id
    // 0 = all, 1 = by item id
    // 1,1,1 
    if (
        $stocks->suppliers_products_suppliers_id !== "0"
        && $stocks->suppliers_products_category_id !== "0" && $stocks->suppliers_products_aid !== "0"
    ) {
        $query = checkReadReportFilterStocksBySupplierCategoryProduct($stocks);
        http_response_code(200);
        getQueriedData($query);
    }

    // if all supplier, all category, product by id 
    // 0 = all, 1 = by item id
    // 0,0,1
    if (
        $stocks->suppliers_products_suppliers_id === "0"
        && $stocks->suppliers_products_category_id === "0" && $stocks->suppliers_products_aid !== "0"
    ) {
        $query = checkReadReportStocksFilterByProduct($stocks);
        http_response_code(200);
        getQueriedData($query);
    }

    // if all supplier, all category, all product 
    // 0 = all, 1 = by item id
    // 0,0,0 
    $query = checkReadReportStocksFilterAll($stocks);
    http_response_code(200);
    getQueriedData($query);
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
