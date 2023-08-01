<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/inventory/report/ReportSales.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$reportSales = new ReportSales($conn);
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
    $reportSales->sales_member_id = checkIndex($allValues, "member_id");
    $reportSales->suppliers_products_suppliers_id = checkIndex($allValues, "supplier_id");
    $reportSales->suppliers_products_category_id = checkIndex($allValues, "category_id");
    $reportSales->orders_product_id = checkIndex($allValues, "product_id");
    $reportSales->start_date = checkIndex($allValues, "start_date");
    $reportSales->end_date = checkIndex($allValues, "end_date");

    // if all member, all supplier , category by id, all product 
    // 0 = all, 1 = by item id
    // 0,0,1,0
    if (
        $reportSales->sales_member_id === "0" && $reportSales->suppliers_products_suppliers_id === "0"
        && $reportSales->suppliers_products_category_id !== "0" && $reportSales->orders_product_id === "0"
    ) {

        $query = checkReadReportSalesFilterByCategory($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if all member,  supplier by id, category by id , all product 
    // 0 = all, 1 = by item id
    // 0,1,1,0
    if (
        $reportSales->sales_member_id === "0" && $reportSales->suppliers_products_suppliers_id !== "0"
        && $reportSales->suppliers_products_category_id !== "0" && $reportSales->orders_product_id === "0"
    ) {

        $query = checkReadReportSalesFilterBySupplierCategory($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if  all member, supplier by id,  all category, all product 
    // 0 = all, 1 = by item id
    // 0,1,0,0
    if (
        $reportSales->sales_member_id === "0" && $reportSales->suppliers_products_suppliers_id !== "0"
        && $reportSales->suppliers_products_category_id === "0" && $reportSales->orders_product_id === "0"
    ) {

        $query = checkReadReportSalesFilterBySupplier($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if  all member, supplier by id, all category, product by id  
    // 0 = all, 1 = by item id
    // 0,1,0,1
    if (
        $reportSales->sales_member_id === "0" && $reportSales->suppliers_products_suppliers_id !== "0"
        && $reportSales->suppliers_products_category_id === "0" && $reportSales->orders_product_id !== "0"
    ) {

        $query = checkReadReportSalesFilterBySupplierProduct($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if  all member, all supplier, category by id, product by id  
    // 0 = all, 1 = by item id
    // 0,0,1,1
    if (
        $reportSales->sales_member_id === "0" && $reportSales->suppliers_products_suppliers_id === "0"
        && $reportSales->suppliers_products_category_id !== "0" && $reportSales->orders_product_id !== "0"
    ) {

        $query = checkReadReportSalesFilterByCategoryProduct($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if all member, supplier by id, category by id, product by id
    // 0 = all, 1 = by item id
    // 0,1,1,1 
    if (
        $reportSales->sales_member_id === "0" && $reportSales->suppliers_products_suppliers_id !== "0"
        && $reportSales->suppliers_products_category_id !== "0" && $reportSales->orders_product_id !== "0"
    ) {
        $query = checkReadReportFilterSalesBySupplierCategoryProduct($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if all member, all supplier, all category, product by id 
    // 0 = all, 1 = by item id
    //  0,0,0,1
    if (
        $reportSales->sales_member_id === "0" && $reportSales->suppliers_products_suppliers_id === "0"
        && $reportSales->suppliers_products_category_id === "0" && $reportSales->orders_product_id !== "0"
    ) {
        $query = checkReadReportSalesFilterByProduct($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if member by Id, all supplier,  all category, all product 
    // 0 = all, 1 = by item id
    // 1,0,0,0
    if (
        $reportSales->sales_member_id !== "0" && $reportSales->suppliers_products_suppliers_id === "0"
        && $reportSales->suppliers_products_category_id === "0" && $reportSales->orders_product_id === "0"
    ) {

        $query = checkReadReportSalesFilterByMember($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if member by Id, supplier by Id,  all category, all product 
    // 0 = all, 1 = by item id
    // 1,1,0,0
    if (
        $reportSales->sales_member_id !== "0" && $reportSales->suppliers_products_suppliers_id !== "0"
        && $reportSales->suppliers_products_category_id === "0" && $reportSales->orders_product_id === "0"
    ) {

        $query = checkReadReportSalesFilterByMemberSupplier($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }


    // if member by Id, supplier by Id, category by Id, all product 
    // 0 = all, 1 = by item id
    // 1,1,1,0
    if (
        $reportSales->sales_member_id !== "0" && $reportSales->suppliers_products_suppliers_id !== "0"
        && $reportSales->suppliers_products_category_id !== "0" && $reportSales->orders_product_id === "0"
    ) {

        $query = checkReadReportSalesFilterByMemberSupplierCategory($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if member by Id, supplier by Id, category by Id, product by Id
    // 0 = all, 1 = by item id
    // 1,1,1,1
    if (
        $reportSales->sales_member_id !== "0" && $reportSales->suppliers_products_suppliers_id !== "0"
        && $reportSales->suppliers_products_category_id !== "0" && $reportSales->orders_product_id !== "0"
    ) {

        $query = checkReadReportSalesFilterByMemberSupplierCategoryProduct($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if member by Id, supplier by Id, all category , product by Id
    // 0 = all, 1 = by item id
    // 1,1,0,1
    if (
        $reportSales->sales_member_id !== "0" && $reportSales->suppliers_products_suppliers_id !== "0"
        && $reportSales->suppliers_products_category_id === "0" && $reportSales->orders_product_id !== "0"
    ) {

        $query = checkReadReportSalesFilterByMemberSupplierProduct($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if member by Id, all supplier, category by Id , product by Id
    // 0 = all, 1 = by item id
    // 1,0,1,1
    if (
        $reportSales->sales_member_id !== "0" && $reportSales->suppliers_products_suppliers_id === "0"
        && $reportSales->suppliers_products_category_id !== "0" && $reportSales->orders_product_id !== "0"
    ) {

        $query = checkReadReportSalesFilterByMemberCategoryProduct($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if member by Id, all supplier, all category , product by Id
    // 0 = all, 1 = by item id
    // 1,0,0,1
    if (
        $reportSales->sales_member_id !== "0" && $reportSales->suppliers_products_suppliers_id === "0"
        && $reportSales->suppliers_products_category_id === "0" && $reportSales->orders_product_id !== "0"
    ) {

        $query = checkReadReportSalesFilterByMemberProduct($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if member by Id, all supplier, all category , product by Id
    // 0 = all, 1 = by item id
    // 1,0,1,0
    if (
        $reportSales->sales_member_id !== "0" && $reportSales->suppliers_products_suppliers_id === "0"
        && $reportSales->suppliers_products_category_id !== "0" && $reportSales->orders_product_id === "0"
    ) {

        $query = checkReadReportSalesFilterByMemberCategory($reportSales);
        http_response_code(200);
        getQueriedData($query);
    }

    // if all member,  all supplier, all category, all product 
    // 0 = all, 1 = by item id
    //  0,0,0,0 
    $query = checkReadReportSalesFilterAll($reportSales);
    http_response_code(200);
    getQueriedData($query);
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
