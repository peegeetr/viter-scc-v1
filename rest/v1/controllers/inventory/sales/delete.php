<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$sales = new Sales($conn);
// get $_GET data
// check if salesid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("salesid", $_GET)) {

    // get task id from query string
    $sales->sales_aid = $_GET['salesid'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($sales->sales_aid);
    // // update sold if remove
    // checkUpdateQunatity($sales);
    // delete
    $query = checkDelete($sales);

    returnSuccess($sales, "sales", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
