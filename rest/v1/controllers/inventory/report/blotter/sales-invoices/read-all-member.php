<?php
// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../../models/inventory/report/blotter/SalesInvoices.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$salesInvoices = new SalesInvoices($conn);
$response = new Response();

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    // if request is a GET e.g. /file_upload
    if (empty($_GET)) {

        $query = checkReadAllMember($salesInvoices);
        http_response_code(200);
        getQueriedData($query);
    }
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
