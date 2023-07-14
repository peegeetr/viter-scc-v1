<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/point-of-sales/PointOfSales.php';
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    // POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $result = require 'create.php';
        sendResponse($result);
        exit;
    }
    // PUT
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $result = require 'update.php';
        sendResponse($result);
        exit;
    }
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
