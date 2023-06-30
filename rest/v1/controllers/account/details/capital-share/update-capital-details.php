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
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("membersId", $_GET)) {
        // check data
        checkPayload($data);
        // get shareid from query string
        $share->capital_share_member_id = $_GET['membersId'];
        $share->members_member_fee = checkIndex($data, "members_member_fee");
        $share->members_subscribe_capital_id = checkIndex($data, "members_subscribe_capital_id");
        $share->capital_share_date = date("Y-m-d H:i:s");
        $share->capital_share_created = date("Y-m-d H:i:s");
        $share->capital_share_datetime = date("Y-m-d H:i:s");

        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($share->capital_share_member_id);

        // check if member fee and initial payment is not empty
        $readMemberFee = $share->readMemberFeeByMemberId();
        $row = $readMemberFee->fetch(PDO::FETCH_ASSOC);
        extract($row);

        // if member fee is empty create
        if ($members_member_fee === "") {
            $share->capital_share_paid_up = checkIndex($data, "members_initial_payment");
            $share->capital_share_or = checkIndex($data, "capital_share_or");
            // create initails
            checkCreate($share);
            checkCreateMemberFee($share);
        }
        // update
        $query = checkUpdateCapitalDetails($share);
        returnSuccess($share, "capital share", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
