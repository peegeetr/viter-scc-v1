<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$patronage = new Patronage($conn);
// get $_GET data
// check if patronageid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("patronageid", $_GET)) {

    // get task id from query string
    $patronage->patronage_aid = $_GET['patronageid'];

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($patronage->patronage_aid);
    // // update sold if remove
    // checkUpdateQunatity($patronage);
    // delete
    $query = checkDelete($patronage);

    returnSuccess($patronage, "patronage", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
