<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$suppliersProducts = new SuppliersProducts($conn);
// get $_GET data
// check if supplierProductsid is in the url e.g. /supplierProductsid/1
$error = [];
$returnData = [];
if (array_key_exists("supplierProductsid", $_GET)) {
    // check data
    checkPayload($data);
    // get supplierProductsid from query string
    $suppliersProducts->suppliers_products_aid = $_GET['supplierProductsid'];
    $suppliersProducts->suppliers_products_scc_price = checkIndex($data, "suppliers_products_scc_price");
    $suppliersProducts->suppliers_products_market_price = checkIndex($data, "suppliers_products_market_price");
    $suppliersProducts->suppliers_products_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($suppliersProducts->suppliers_products_aid);
    // update
    $query = checkUpdateSccPrice($suppliersProducts);
    returnSuccess($suppliersProducts, "Suppliers Products", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
