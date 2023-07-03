<?php
// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../../models/account/details/capital-share/Amortization.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$amortization = new Amortization($conn);
$response = new Response();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// check if stocksid is in the url e.g. /jobtitle/1
$error = [];
$returnData = [];
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("amortizationId", $_GET)) {
        // check data
        checkPayload($data);
        // get task id from query string
        $amortization->capital_amortization_aid = $_GET['amortizationId'];
        $amortization->capital_amortization_is_active = trim($data["isActive"]);
        $amortization->capital_amortization_datetime = date("Y-m-d H:i:s");

        $allItem = $data["item"];
        if (count($allItem) > 0) {
            $amortization->capital_amortization_member_id = $allItem["capital_amortization_member_id"];
        }
        //check to see if task id in query string is not empty and is number, if not return json error
        checkId($amortization->capital_amortization_aid);
        checkId($amortization->capital_amortization_member_id);
        haveActiveNotById($amortization);

        $query = checkActive($amortization);
        http_response_code(200);
        returnSuccess($amortization, "Amortization", $query);
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
