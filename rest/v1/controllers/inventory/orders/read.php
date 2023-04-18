<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$patronage = new Patronage($conn);
// get $_GET data
// check if patronageid is in the url e.g. /savings/1
$error = [];
$returnData = [];
if (array_key_exists("patronageid", $_GET)) {
    // get task id from query string
    $patronage->patronage_aid  = $_GET['patronageid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($patronage->patronage_aid);
    $query = checkReadById($patronage);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /savings
if (empty($_GET)) {
    $query = checkReadAll($patronage);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
