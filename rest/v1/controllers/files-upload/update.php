<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$file = new FileUpload($conn);
// get $_GET data
// check if fileid is in the url e.g. /fileid/1
$error = [];
$returnData = [];
if (array_key_exists("fileid", $_GET)) {
    // check data
    checkPayload($data); 
    // get fileid from query string
    $file->file_upload_aid = $_GET['fileid'];
    $file->file_upload_name = checkIndex($data, "file_upload_name");
    $file->file_upload_link = checkIndex($data, "file_upload_link");
    $file->file_upload_date = checkIndex($data, "file_upload_date");
    $file->file_upload_datetime = date("Y-m-d H:i:s");
 
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($file->file_upload_aid); 
    // update
    $query = checkUpdate($file);
    returnSuccess($file, "file upload", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
