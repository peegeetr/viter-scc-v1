<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$suppliersProducts = new SuppliersProducts($conn);
// get $_GET data
// check if supplierid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("supplierProductsid", $_GET)) {

    // get task id from query string
    $suppliersProducts->suppliers_products_aid = $_GET['supplierProductsid'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($suppliersProducts->suppliers_products_aid);

    // delete
    isAssociated($suppliersProducts);
    isAssociatedInOrder($suppliersProducts);
    isAssociatedInHistory($suppliersProducts);
    $query = checkDelete($suppliersProducts);

    returnSuccess($suppliersProducts, "Suppliers Products", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
