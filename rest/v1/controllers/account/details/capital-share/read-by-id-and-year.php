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

    if (array_key_exists("memberId", $_GET) && array_key_exists("year", $_GET)) {
        // get data
        $share->capital_share_member_id = $_GET['memberId'];
        $share->capital_share_year = $_GET['year'];

        checkId($share->capital_share_member_id);
        checkId($share->capital_share_year);

        $query = checkReadByIdAndYear($share);
        http_response_code(200);
        getQueriedData($query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
