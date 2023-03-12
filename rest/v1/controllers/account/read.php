<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$members = new Members($conn);
// get $_GET data
// check if membersid is in the url e.g. /members/1
$error = [];
$returnData = [];
if (array_key_exists("membersid", $_GET)) {
    // get task id from query string
    $members->members_aid = $_GET['membersid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($members->members_aid);
    $query = checkReadById($members);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /members
if (empty($_GET)) {
    $query = checkReadAll($members);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
