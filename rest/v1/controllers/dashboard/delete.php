<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$announcement = new Announcement($conn);
// get $_GET data
// check if announcementid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("announcementid", $_GET)) {

    // get task id from query string
    $announcement->announcement_aid = $_GET['announcementid'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($announcement->announcement_aid);
 
    // delete
    $query = checkDelete($announcement);

    returnSuccess($announcement, "announcement", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
