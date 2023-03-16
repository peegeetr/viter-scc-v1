<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$file = new FileUpload($conn);
// get $_GET data
// check if fileid is in the url e.g. /file_upload/1
$error = [];
$returnData = [];
if (array_key_exists("fileid", $_GET)) {
    // get task id from query string
    $file->file_upload_aid = $_GET['fileid'];
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($file->file_upload_aid);
    $query = checkReadById($file);
    http_response_code(200);
    getQueriedData($query);
}

// if request is a GET e.g. /file_upload
if (empty($_GET)) {
    $query = checkReadAll($file);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
