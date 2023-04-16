<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$suppliers = new Suppliers($conn);
// get $_GET data
// check if supplierid is in the url e.g. /supplierid/1
$error = [];
$returnData = [];
if (array_key_exists("supplierid", $_GET)) {
    // check data
    checkPayload($data); 
    // get supplierid from query string
    $suppliers->suppliers_aid = $_GET['supplierid'];
    $suppliers->suppliers_company_name = checkIndex($data, "suppliers_company_name");
    $suppliers->suppliers_company_address = checkIndex($data, "suppliers_company_address");
    $suppliers->suppliers_contact_person = checkIndex($data, "suppliers_contact_person");
    $suppliers->suppliers_contact_num = checkIndex($data, "suppliers_contact_num"); 
    $suppliers->suppliers_datetime = date("Y-m-d H:i:s"); 

    $suppliers_company_name_old = checkIndex($data, "suppliers_company_name_old");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($suppliers->suppliers_aid);
    // check name
    compareName($suppliers, $suppliers_company_name_old, $suppliers->suppliers_company_name);
    // update
    $query = checkUpdate($suppliers);
    returnSuccess($suppliers, "Suppliers", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
