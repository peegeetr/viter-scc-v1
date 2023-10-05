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

// create product id format ex. (Prod-001) 
$formattedProductId = "";
$id = "";
$productLastId = $suppliersProducts->readLastProductId();
if ($productLastId->rowCount() == 0) {
    // create new id
    $formattedProductId = "prod" . "-" . "001";
} else {

    $row = $productLastId->fetch(PDO::FETCH_ASSOC);
    extract($row);
    // product_id from existing record ex. (Prod-001)
    $existingMeberId = explode("-", $suppliers_products_number);

    $lastId =  intval($existingMeberId[1]) + 1;
    if ($lastId < 10) {
        $id = "00" . $lastId;
    } elseif ($lastId < 100) {
        $id = "0" . $lastId;
    } else {
        $id = $lastId;
    }

    $formattedProductId =  "prod" . "-" . $id;
}

//check to see if search keyword in query string is not empty and less than 50 chars
checkKeyword($formattedProductId);

$suppliersProducts->suppliers_products_number = $formattedProductId;

$valPrice = $data["valuePrice"];
$suppliersProducts->suppliers_products_scc_price = checkIndex($valPrice, "suppliers_products_scc_price");
$suppliersProducts->suppliers_products_retail_price = checkIndex($valPrice, "suppliers_products_retail_price");
$suppliersProducts->suppliers_products_price = checkIndex($valPrice, "suppliers_products_price");
$suppliersProducts->suppliers_products_ws_retail_price = checkIndex($valPrice, "suppliers_products_ws_retail_price");
$suppliersProducts->suppliers_products_ws_scc_price = checkIndex($valPrice, "suppliers_products_ws_scc_price");
$suppliersProducts->suppliers_products_member_percent = checkIndex($valPrice, "suppliers_products_member_percent");
$suppliersProducts->suppliers_products_retail_percent = checkIndex($valPrice, "suppliers_products_retail_percent");
$suppliersProducts->suppliers_products_ws_member_percent = checkIndex($valPrice, "suppliers_products_ws_member_percent");
$suppliersProducts->suppliers_products_ws_retail_percent = checkIndex($valPrice, "suppliers_products_ws_retail_percent");

$suppliersProducts->suppliers_products_is_other_percent = checkIndex($data, "suppliers_products_is_other_percent");
$suppliersProducts->suppliers_products_name = checkIndex($data, "suppliers_products_name");
$suppliersProducts->suppliers_products_category_id = checkIndex($data, "suppliers_products_category_id");
$suppliersProducts->suppliers_products_suppliers_id = checkIndex($data, "suppliers_products_suppliers_id");
$suppliersProducts->suppliers_products_created = date("Y-m-d H:i:s");
$suppliersProducts->suppliers_products_datetime = date("Y-m-d H:i:s");

// check name
isNameExist($suppliersProducts, $suppliersProducts->suppliers_products_name);
// create
$query = checkCreate($suppliersProducts);
checkCreateHistoryPrice($suppliersProducts);

returnSuccess($suppliersProducts, "Suppliers Products", $query);
