<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$file = new FileUpload($conn);
// get $_GET data
// check if fileid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("fileid", $_GET)) {

    // get task id from query string
    $file->file_upload_aid = $_GET['fileid'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($file->file_upload_aid);
    // delete
    $query = checkDelete($file);

    returnSuccess($file, "file upload", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
