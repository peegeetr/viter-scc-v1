<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$net = new NetSurplus($conn);
// get $_GET data
// check if productid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("netId", $_GET)) {

    // get task id from query string
    $net->net_surplus_aid = $_GET['netId'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($net->net_surplus_aid);
    // delete
    $query = checkDelete($net);

    returnSuccess($net, "net surplus", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
