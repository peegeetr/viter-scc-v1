<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$amortization = new Amortization($conn);
// get $_GET data
// check if shareid is in the url e.g. /shareid/1
$error = [];
$returnData = [];
if (array_key_exists("amortizationId", $_GET)) {
    // check data
    checkPayload($data);
    // get shareid from query string
    $amortization->capital_amortization_aid = $_GET['amortizationId'];
    $amortization->capital_amortization_amount = checkIndex($data, "capital_amortization_amount");
    $amortization->capital_amortization_datetime = date("Y-m-d H:i:s");

    //check to see if task id in query string is not empty and is number, if not return json error
    checkId($amortization->capital_amortization_aid);
    // update
    $query = checkUpdate($amortization);
    returnSuccess($amortization, "Amortization", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
