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
    $sales->sales_member_id = checkIndex($allValues, "member_id");
    $sales->suppliers_products_suppliers_id = checkIndex($allValues, "supplier_id");
    $sales->suppliers_products_category_id = checkIndex($allValues, "category_id");
    $sales->orders_product_id = checkIndex($allValues, "product_id");
    $sales->start_date = checkIndex($allValues, "start_date");
    $sales->end_date = checkIndex($allValues, "end_date");

    // if all member, all supplier , category by id, all product 
    // 0 = all, 1 = by item id
    // 0,0,1,0
    if (
        $sales->sales_member_id === "0" && $sales->suppliers_products_suppliers_id === "0"
        && $sales->suppliers_products_category_id !== "0" && $sales->orders_product_id === "0"
    ) {

        $query = checkReadReportSalesFilterByCategory($sales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if all member,  supplier by id, category by id , all product 
    // 0 = all, 1 = by item id
    // 0,1,1,0
    if (
        $sales->sales_member_id === "0" && $sales->suppliers_products_suppliers_id !== "0"
        && $sales->suppliers_products_category_id !== "0" && $sales->orders_product_id === "0"
    ) {

        $query = checkReadReportSalesFilterBySupplierCategory($sales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if  all member, supplier by id,  all category, all product 
    // 0 = all, 1 = by item id
    // 0,1,0,0
    if (
        $sales->sales_member_id === "0" && $sales->suppliers_products_suppliers_id !== "0"
        && $sales->suppliers_products_category_id === "0" && $sales->orders_product_id === "0"
    ) {

        $query = checkReadReportSalesFilterBySupplier($sales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if  all member, supplier by id, all category, product by id  
    // 0 = all, 1 = by item id
    // 0,1,0,1
    if (
        $sales->sales_member_id === "0" && $sales->suppliers_products_suppliers_id !== "0"
        && $sales->suppliers_products_category_id === "0" && $sales->orders_product_id !== "0"
    ) {

        $query = checkReadReportSalesFilterBySupplierProduct($sales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if  all member, all supplier, category by id, product by id  
    // 0 = all, 1 = by item id
    // 0,0,1,1
    if (
        $sales->sales_member_id === "0" && $sales->suppliers_products_suppliers_id === "0"
        && $sales->suppliers_products_category_id !== "0" && $sales->orders_product_id !== "0"
    ) {

        $query = checkReadReportSalesFilterByCategoryProduct($sales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if all member, supplier by id, category by id, product by id
    // 0 = all, 1 = by item id
    // 0,1,1,1 
    if (
        $sales->sales_member_id === "0" && $sales->suppliers_products_suppliers_id !== "0"
        && $sales->suppliers_products_category_id !== "0" && $sales->orders_product_id !== "0"
    ) {
        $query = checkReadReportFilterSalesBySupplierCategoryProduct($sales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if all member, all supplier, all category, product by id 
    // 0 = all, 1 = by item id
    //  0,0,0,1
    if (
        $sales->sales_member_id === "0" && $sales->suppliers_products_suppliers_id === "0"
        && $sales->suppliers_products_category_id === "0" && $sales->orders_product_id !== "0"
    ) {
        $query = checkReadReportSalesFilterByProduct($sales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if member by Id, all supplier,  all category, all product 
    // 0 = all, 1 = by item id
    // 1,0,0,0
    if (
        $sales->sales_member_id !== "0" && $sales->suppliers_products_suppliers_id === "0"
        && $sales->suppliers_products_category_id === "0" && $sales->orders_product_id === "0"
    ) {

        $query = checkReadReportSalesFilterByMember($sales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if member by Id, supplier by Id,  all category, all product 
    // 0 = all, 1 = by item id
    // 1,1,0,0
    if (
        $sales->sales_member_id !== "0" && $sales->suppliers_products_suppliers_id !== "0"
        && $sales->suppliers_products_category_id === "0" && $sales->orders_product_id === "0"
    ) {

        $query = checkReadReportSalesFilterByMemberSupplier($sales);
        http_response_code(200);
        getQueriedData($query);
    }


    // if member by Id, supplier by Id, category by Id, all product 
    // 0 = all, 1 = by item id
    // 1,1,1,0
    if (
        $sales->sales_member_id !== "0" && $sales->suppliers_products_suppliers_id !== "0"
        && $sales->suppliers_products_category_id !== "0" && $sales->orders_product_id === "0"
    ) {

        $query = checkReadReportSalesFilterByMemberSupplierCategory($sales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if member by Id, supplier by Id, category by Id, product by Id
    // 0 = all, 1 = by item id
    // 1,1,1,1
    if (
        $sales->sales_member_id !== "0" && $sales->suppliers_products_suppliers_id !== "0"
        && $sales->suppliers_products_category_id !== "0" && $sales->orders_product_id !== "0"
    ) {

        $query = checkReadReportSalesFilterByMemberSupplierCategoryProduct($sales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if member by Id, supplier by Id, all category , product by Id
    // 0 = all, 1 = by item id
    // 1,1,0,1
    if (
        $sales->sales_member_id !== "0" && $sales->suppliers_products_suppliers_id !== "0"
        && $sales->suppliers_products_category_id === "0" && $sales->orders_product_id !== "0"
    ) {

        $query = checkReadReportSalesFilterByMemberSupplierProduct($sales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if member by Id, all supplier, category by Id , product by Id
    // 0 = all, 1 = by item id
    // 1,0,1,1
    if (
        $sales->sales_member_id !== "0" && $sales->suppliers_products_suppliers_id === "0"
        && $sales->suppliers_products_category_id !== "0" && $sales->orders_product_id !== "0"
    ) {

        $query = checkReadReportSalesFilterByMemberCategoryProduct($sales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if member by Id, all supplier, all category , product by Id
    // 0 = all, 1 = by item id
    // 1,0,0,1
    if (
        $sales->sales_member_id !== "0" && $sales->suppliers_products_suppliers_id === "0"
        && $sales->suppliers_products_category_id === "0" && $sales->orders_product_id !== "0"
    ) {

        $query = checkReadReportSalesFilterByMemberProduct($sales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if member by Id, all supplier, all category , product by Id
    // 0 = all, 1 = by item id
    // 1,0,1,0
    if (
        $sales->sales_member_id !== "0" && $sales->suppliers_products_suppliers_id === "0"
        && $sales->suppliers_products_category_id !== "0" && $sales->orders_product_id === "0"
    ) {

        $query = checkReadReportSalesFilterByMemberCategory($sales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if all member,  all supplier, all category, all product 
    // 0 = all, 1 = by item id
    //  0,0,0,0 
    $query = checkReadReportSalesFilterAll($sales);
    http_response_code(200);
    getQueriedData($query);
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
