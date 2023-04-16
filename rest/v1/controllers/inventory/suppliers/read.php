<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$suppliers = new Suppliers($conn);
// get $_GET data
// check if supplierid is in the url e.g. /suppliers/1
$error = [];
$returnData = [];
if (array_key_exists("supplierid", $_GET)) {
    // get task id from query string
    $suppliers->suppliers_aid = $_GET['supplierid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($suppliers->suppliers_aid);
    $query = checkReadById($suppliers);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /suppliers
if (empty($_GET)) {
    $query = checkReadAll($suppliers);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
