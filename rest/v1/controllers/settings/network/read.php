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
    // get task id from query string
    $network->network_aid = $_GET['networkid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($network->network_aid);
    $query = checkReadById($network);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /network
if (empty($_GET)) {
    $query = checkReadAll($network);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
