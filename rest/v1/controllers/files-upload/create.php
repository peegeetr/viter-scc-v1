<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$file = new FileUpload($conn);
// get should not be present
if (array_key_exists("fileid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
 
$file->file_upload_name = checkIndex($data, "file_upload_name");
$file->file_upload_link = checkIndex($data, "file_upload_link");
$file->file_upload_date = checkIndex($data, "file_upload_date"); 
$file->file_upload_created = date("Y-m-d H:i:s");
$file->file_upload_datetime = date("Y-m-d H:i:s"); 
 
// create
$query = checkCreate($file); 

returnSuccess($file, "file_upload", $query);
