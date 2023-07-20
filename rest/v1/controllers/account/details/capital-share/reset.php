<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/account/details/capital-share/CapitalShare.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$share = new CapitalShare($conn);
$response = new Response();

// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("memberId", $_GET)) {
        // get task id from query string
        $share->capital_share_member_id = $_GET['memberId'];
        $share->capital_share_datetime = date("Y-m-d H:i:s");

        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($share->capital_share_member_id);
        // update member remove member fee and subs capital
        checkUpdateCapitalDetails($share);
        // delete initial capital 
        $query = checkDeleteInitialPayById($share);
        returnSuccess($share, "capital share", $query);
    }
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
