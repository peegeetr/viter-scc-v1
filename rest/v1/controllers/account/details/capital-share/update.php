<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$share = new CapitalShare($conn);
// get $_GET data
// check if shareid is in the url e.g. /shareid/1
$error = [];
$returnData = [];
if (array_key_exists("shareid", $_GET)) {
    // check data
    checkPayload($data);
    // get shareid from query string
    $share->capital_share_aid = $_GET['shareid'];
    $share->capital_share_or = checkIndex($data, "capital_share_or");
    $share->capital_share_date = checkIndex($data, "capital_share_date");
    $share->capital_share_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($share->capital_share_aid);
    // update
    $query = checkUpdate($share);
    returnSuccess($share, "capital share", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
