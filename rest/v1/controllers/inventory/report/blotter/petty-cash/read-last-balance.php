<?php
// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../../models/inventory/report/blotter/PettyCash.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$pettyCash = new PettyCash($conn);
$response = new Response();

// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    // if request is a GET e.g. /file_upload
    if (empty($_GET)) {
        $query = checkReadLastBalance($pettyCash);
        http_response_code(200);
        getQueriedData($query);
    }
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
