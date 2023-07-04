<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/inventory/sales/Sales.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$sales = new Sales($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (
        array_key_exists("supplierId", $_GET) && array_key_exists("categoryId", $_GET) &&
        array_key_exists("productId", $_GET) && array_key_exists("startDate", $_GET) && array_key_exists("endDate", $_GET)
    ) {
        // get data
        // get task id from query string  
        $sales->suppliers_products_suppliers_id = $_GET['supplierId'];
        $sales->suppliers_products_category_id = $_GET['categoryId'];
        $sales->orders_product_id = $_GET['productId'];
        $sales->start_date = $_GET['startDate'];
        $sales->end_date = $_GET['endDate'];
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($sales->suppliers_products_suppliers_id);
        checkId($sales->suppliers_products_category_id);
        checkId($sales->orders_product_id);
        //check to see if search keyword in query string is not empty and less than 50 chars
        checkKeyword($sales->start_date);
        checkKeyword($sales->end_date);

        // if all supplier , category by id, all product 
        // 0 = all, 1 = by item id
        // 0,1,0
        if ($sales->suppliers_products_suppliers_id === "0" && $sales->suppliers_products_category_id !== "0" && $sales->orders_product_id === "0") {

            $query = checkReadReportSalesFilterByCategory($sales);
            http_response_code(200);
            getQueriedData($query);
        }

        // if supplier by id, by id category, all product 
        // 0 = all, 1 = by item id
        // 1,1,0
        if ($sales->suppliers_products_suppliers_id !== "0" && $sales->suppliers_products_category_id !== "0" && $sales->orders_product_id === "0") {

            $query = checkReadReportSalesFilterBySupplierCategory($sales);
            http_response_code(200);
            getQueriedData($query);
        }

        // if supplier by id,  all category, all product 
        // 0 = all, 1 = by item id
        // 1,0,0
        if ($sales->suppliers_products_suppliers_id !== "0" && $sales->suppliers_products_category_id === "0" && $sales->orders_product_id === "0") {

            $query = checkReadReportSalesFilterBySupplier($sales);
            http_response_code(200);
            getQueriedData($query);
        }

        // if supplier by id, all category, product by id  
        // 0 = all, 1 = by item id
        // 1,0,1
        if ($sales->suppliers_products_suppliers_id !== "0" && $sales->suppliers_products_category_id === "0" && $sales->orders_product_id !== "0") {

            $query = checkReadReportSalesFilterBySupplierProduct($sales);
            http_response_code(200);
            getQueriedData($query);
        }

        // if  all supplier, category by id, product by id  
        // 0 = all, 1 = by item id
        // 0,1,1
        if ($sales->suppliers_products_suppliers_id === "0" && $sales->suppliers_products_category_id !== "0" && $sales->orders_product_id !== "0") {

            $query = checkReadReportSalesFilterByCategoryProduct($sales);
            http_response_code(200);
            getQueriedData($query);
        }

        // if supplier by id, category by id, product by id
        // 0 = all, 1 = by item id
        // 1,1,1 
        if ($sales->suppliers_products_suppliers_id !== "0" && $sales->suppliers_products_category_id !== "0" && $sales->orders_product_id !== "0") {
            $query = checkReadReportFilterSalesBySupplierCategoryProduct($sales);
            http_response_code(200);
            getQueriedData($query);
        }

        // if all supplier, all category, product by id 
        // 0 = all, 1 = by item id
        //  0,0,1
        if ($sales->suppliers_products_suppliers_id === "0"  && $sales->suppliers_products_category_id === "0" && $sales->orders_product_id !== "0") {
            $query = checkReadReportSalesFilterByProduct($sales);
            http_response_code(200);
            getQueriedData($query);
        }

        // if all supplier, all category, all product 
        // 0 = all, 1 = by item id
        //  0,0,0
        $query = checkReadReportSalesFilterAll($sales);
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
