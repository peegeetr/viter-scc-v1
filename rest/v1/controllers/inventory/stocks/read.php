<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$stocks = new Stocks($conn);
// get $_GET data
// check if stockid is in the url e.g. /file_upload/1
$error = [];
$returnData = [];
if (array_key_exists("stockid", $_GET)) {
    // get task id from query string
    $stocks->stocks_aid = $_GET['stockid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($stocks->stocks_aid);
    $query = checkReadById($stocks);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /file_upload
if (empty($_GET)) {
    $query = checkReadAll($stocks);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
