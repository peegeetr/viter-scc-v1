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

    $allItem = $data["item"];
    if (count($allItem) > 0) {
        $share->capital_share_is_initial_pay = $allItem["capital_share_is_initial_pay"];
        $share->capital_share_member_id = $allItem["capital_share_member_id"];
    }

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($share->capital_share_is_initial_pay);
    checkId($share->capital_share_member_id);
    checkId($share->capital_share_aid);

    // if delete member fee or initial payment
    if ($share->capital_share_is_initial_pay === 1) {
        $share->members_subscribe_capital_id = "";
        $share->members_member_fee = "";
        checkUpdateCapitalDetails($share);
        $query = checkDeleteInitialPayById($share);
    }

    // if delete is not member fee or not initial payment
    if ($share->capital_share_is_initial_pay === 0) {
        $query = checkDelete($share);
    }

    returnSuccess($share, "capital share", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
