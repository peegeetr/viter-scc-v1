<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$network = new Network($conn);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("networkid", $_GET)) {
    // get data
    // get task id from query string
    $network->network_aid = $_GET['networkid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($network->network_aid);
    // isAssociated($network);
    $query = checkDelete($network);
    returnSuccess($network, "network", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
