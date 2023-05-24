<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$file = new Files($conn);
// get $_GET data
// check if fileid is in the url e.g. /fileid/1
$error = [];
$returnData = [];
if (array_key_exists("fileid", $_GET)) {
    // check data
    checkPayload($data);
    // get fileid from query string
    $file->files_aid = $_GET['fileid'];
    $file->files_name = checkIndex($data, "files_name");
    $file->files_link = checkIndex($data, "files_link");
    $file->files_date = checkIndex($data, "files_date");
    $file->files_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($file->files_aid);
    // update
    $query = checkUpdate($file);
    returnSuccess($file, "files", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
