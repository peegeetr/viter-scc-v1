<?php
// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
// use needed classes 
require '../../../../../models/inventory/report/blotter/OfficialReceipt.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$official_receipt = new OfficialRecipt($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $official_receipt->or_invoice_start = $_GET['start'];
        $official_receipt->or_invoice_total = 20;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($official_receipt->or_invoice_start, $official_receipt->or_invoice_total);
        $query = checkReadLimit($official_receipt);
        $total_result = checkReadAll($official_receipt);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $official_receipt->or_invoice_total;
        $returnData["page"] = (int)$official_receipt->or_invoice_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $official_receipt->or_invoice_total);
        $returnData["success"] = true;
        $response->setData($returnData);
        $response->send();
        exit;
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
