<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$suppliers = new Suppliers($conn);
// get should not be present
if (array_key_exists("supplierid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
 
$suppliers->suppliers_company_name = checkIndex($data, "suppliers_company_name");
$suppliers->suppliers_company_address = checkIndex($data, "suppliers_company_address");
$suppliers->suppliers_contact_person = checkIndex($data, "suppliers_contact_person");
$suppliers->suppliers_contact_num = checkIndex($data, "suppliers_contact_num");
$suppliers->suppliers_is_active = 1;
$suppliers->suppliers_created = date("Y-m-d H:i:s");
$suppliers->suppliers_datetime = date("Y-m-d H:i:s"); 

// check name
isNameExist($suppliers, $suppliers->suppliers_company_name);
// create
$query = checkCreate($suppliers); 

returnSuccess($suppliers, "Suppliers", $query);
