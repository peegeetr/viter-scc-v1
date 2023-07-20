<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$share = new CapitalShare($conn);
// get $_GET data
// check if shareid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
if (array_key_exists("shareid", $_GET)) {

    // get task id from query string
    $share->capital_share_aid = $_GET['shareid'];
    $share->capital_share_datetime = date("Y-m-d H:i:s");


    $query = checkDelete($share);
    returnSuccess($share, "capital share", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
