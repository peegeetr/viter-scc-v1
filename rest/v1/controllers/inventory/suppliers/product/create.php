<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$suppliersProducts = new SuppliersProducts($conn);
// get should not be present
if (array_key_exists("supplierProductsid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$suppliersProducts->suppliers_products_name = checkIndex($data, "suppliers_products_name");
$suppliersProducts->suppliers_products_price = checkIndex($data, "suppliers_products_price");
$suppliersProducts->suppliers_products_suppliers_id = checkIndex($data, "suppliers_products_suppliers_id");
$suppliersProducts->suppliers_products_created = date("Y-m-d H:i:s");
$suppliersProducts->suppliers_products_datetime = date("Y-m-d H:i:s");

// check name
isNameExist($suppliersProducts, $suppliersProducts->suppliers_products_name);
// create
$query = checkCreate($suppliersProducts);

returnSuccess($suppliersProducts, "Suppliers Products", $query);
