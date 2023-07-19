<?php
// set http header
require '../../../../../core/header.php';
// use needed functions
require '../../../../../core/functions.php';
// use needed classes
require '../../../../../models/inventory/report/blotter/PettyCash.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$pettyCash = new PettyCash($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $pettyCash->petty_cash_start = $_GET['start'];
        $pettyCash->petty_cash_total = 20;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($pettyCash->petty_cash_start, $pettyCash->petty_cash_total);
        $query = checkReadLimit($pettyCash);
        $total_result = checkReadAll($pettyCash);
        http_response_code(200);

        $returnData["data"] = getResultData($query);
        $returnData["count"] = $query->rowCount();
        $returnData["total"] = $total_result->rowCount();
        $returnData["per_page"] = $pettyCash->petty_cash_total;
        $returnData["page"] = (int)$pettyCash->petty_cash_start;
        $returnData["total_pages"] = ceil($total_result->rowCount() / $pettyCash->petty_cash_total);
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
