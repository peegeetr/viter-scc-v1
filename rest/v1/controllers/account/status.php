<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/account/Members.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$members = new Members($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if membersid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("membersid", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $members->members_aid = $_GET['membersid'];
        $is_approved = $data['isApproved'];
        $members->members_is_active = trim($data["isActive"]);
        $members->members_datetime = date("Y-m-d H:i:s");
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($members->members_aid);
        // archive validation if members id exist  
        if ($is_approved == "approved") {
            $query = checkApproved($members);
            http_response_code(200);
            returnSuccess($members, "members", $query);
        }
        if ($is_approved == "cancel") {
            $query = checkCancel($members);
            http_response_code(200);
            returnSuccess($members, "members", $query);
        }
        if ($is_approved == "active") {
            // check if assosiated
            isArchiveAssociated($members);
            // check if assosiated
            $query = checkActive($members);
            checkActiveUserOther($members);
            http_response_code(200);
            returnSuccess($members, "members", $query);
        }
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
