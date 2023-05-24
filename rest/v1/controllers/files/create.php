<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$file = new Files($conn);
// get should not be present
if (array_key_exists("fileid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$file->files_name = checkIndex($data, "files_name");
$file->files_link = checkIndex($data, "files_link");
$file->files_date = checkIndex($data, "files_date");
$file->files_created = date("Y-m-d H:i:s");
$file->files_datetime = date("Y-m-d H:i:s");

// create
$query = checkCreate($file);

returnSuccess($file, "files", $query);
