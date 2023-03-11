<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$announcement = new Announcement($conn);
// get should not be present
if (array_key_exists("announcementid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
 
$announcement->announcement_name = checkIndex($data, "announcement_name");
$announcement->announcement_description = checkIndex($data, "announcement_description");
$announcement->announcement_date = checkIndex($data, "announcement_date");
$announcement->announcement_is_active = 1;
$announcement->announcement_created = date("Y-m-d H:i:s");
$announcement->announcement_datetime = date("Y-m-d H:i:s"); 

// check name
isNameExist($announcement, $announcement->announcement_name);
// create
$query = checkCreate($announcement); 

returnSuccess($announcement, "announcement", $query);
