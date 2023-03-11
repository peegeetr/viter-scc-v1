<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$announcement = new Announcement($conn);
// get $_GET data
// check if announcementid is in the url e.g. /announcementid/1
$error = [];
$returnData = [];
if (array_key_exists("announcementid", $_GET)) {
    // check data
    checkPayload($data); 
    // get announcementid from query string
    $announcement->announcement_aid = $_GET['announcementid'];
    $announcement->announcement_name = checkIndex($data, "announcement_name");
    $announcement->announcement_description = checkIndex($data, "announcement_description");
    $announcement->announcement_date = checkIndex($data, "announcement_date");
    $announcement->announcement_datetime = date("Y-m-d H:i:s");

    $announcement_name_old = checkIndex($data, "announcement_name_old");
    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($announcement->announcement_aid);
    // check name
    compareName($announcement, $announcement_name_old, $announcement->announcement_name);
    // update
    $query = checkUpdate($announcement);
    returnSuccess($announcement, "announcement", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
