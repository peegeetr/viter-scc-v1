<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$suppliers = new Suppliers($conn);
// get $_GET data
// check if supplierid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("supplierid", $_GET)) {

    // get task id from query string
    $suppliers->suppliers_aid = $_GET['supplierid'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($suppliers->suppliers_aid);

    // delete
    isAssociated($suppliers);
    $query = checkDelete($suppliers);

    returnSuccess($suppliers, "Suppliers", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
