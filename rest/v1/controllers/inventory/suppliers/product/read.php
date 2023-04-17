<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$suppliersProducts = new SuppliersProducts($conn);
// get $_GET data
// check if supplierProductsid is in the url e.g. /suppliers/1
$error = [];
$returnData = [];
if (array_key_exists("supplierProductsid", $_GET)) {
    // get task id from query string
    $suppliersProducts->suppliers_products_aid = $_GET['supplierProductsid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($suppliersProducts->suppliers_products_aid);
    $query = checkReadById($suppliersProducts);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /suppliers
if (empty($_GET)) {
    $query = checkReadAll($suppliersProducts);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
