<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$movement = new Movement($conn);
// get $_GET data
// check if departmentid is in the url e.g. /department/1
$error = [];
$returnData = [];
if (array_key_exists("movementid", $_GET)) {
    // get task id from query string
    $movement->movement_aid = $_GET['movementid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($movement->movement_aid);
    $query = checkReadById($movement);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /movement
if (empty($_GET)) {
    $query = checkReadAll($movement);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
